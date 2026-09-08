import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PERMISSIONS_KEY } from '../decorators/permisos.decorator';
import { buildPermissionChain } from './permission-chain';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user?.id) {
      return false;
    }

    const chain = buildPermissionChain(this.prisma);

    for (const permiso of requiredPermissions) {
      const decision = await chain.handle(user.id, permiso);
      if (decision !== 'ALLOW') {
        throw new ForbiddenException(
          `No tienes el permiso requerido: ${permiso}`,
        );
      }
    }

    return true;
  }
}