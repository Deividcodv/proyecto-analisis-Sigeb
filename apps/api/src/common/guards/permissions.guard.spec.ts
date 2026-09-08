import { ForbiddenException, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsGuard } from './permissions.guard';
import { PrismaService } from '../../prisma/prisma.service';

function mockExecutionContext(user?: { id: string }): ExecutionContext {
  return {
    switchToHttp: () => ({ getRequest: () => ({ user }) }),
    getHandler: jest.fn(),
    getClass: jest.fn(),
  } as unknown as ExecutionContext;
}

function mockPrisma() {
  return {
    rolPermiso: { findFirst: jest.fn().mockResolvedValue(null) },
    usuarioPermiso: { findFirst: jest.fn().mockResolvedValue(null) },
  } as unknown as PrismaService;
}

describe('PermissionsGuard', () => {
  it('permite cuando no se exigen permisos', async () => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue(undefined),
    } as unknown as Reflector;

    const guard = new PermissionsGuard(reflector, mockPrisma());
    await expect(
      guard.canActivate(mockExecutionContext({ id: 'user-1' })),
    ).resolves.toBe(true);
  });

  it('lanza ForbiddenException si el usuario no tiene el permiso', async () => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue(['convocatoria:crear']),
    } as unknown as Reflector;

    const guard = new PermissionsGuard(reflector, mockPrisma());
    await expect(
      guard.canActivate(mockExecutionContext({ id: 'user-1' })),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('permite cuando el usuario tiene el permiso (override PERMITIR)', async () => {
    const prisma = mockPrisma();
    (prisma.usuarioPermiso.findFirst as jest.Mock).mockResolvedValue({
      efecto: 'PERMITIR',
    });

    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue(['permiso:editar']),
    } as unknown as Reflector;

    const guard = new PermissionsGuard(reflector, prisma);
    await expect(
      guard.canActivate(mockExecutionContext({ id: 'user-1' })),
    ).resolves.toBe(true);
  });

  it('deniega cuando no hay usuario autenticado', async () => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue(['convocatoria:crear']),
    } as unknown as Reflector;

    const guard = new PermissionsGuard(reflector, mockPrisma());
    await expect(guard.canActivate(mockExecutionContext())).resolves.toBe(
      false,
    );
  });
});