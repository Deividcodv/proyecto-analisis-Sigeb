import { PrismaService } from '../../prisma/prisma.service';
import {
  DefaultDenyHandler,
  UsuarioPermisoHandler,
  buildPermissionChain,
} from './permission-chain';

function createMockPrisma() {
  const prisma = {
    rolPermiso: { findFirst: jest.fn() },
    usuarioPermiso: { findFirst: jest.fn() },
  } as unknown as PrismaService;
  return prisma;
}

describe('Permission chain (Chain of Responsibility)', () => {
  it('permite cuando el rol tiene el permiso', async () => {
    const prisma = createMockPrisma();
    (prisma.usuarioPermiso.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.rolPermiso.findFirst as jest.Mock).mockResolvedValue({ id: 'rp-1' });

    const chain = buildPermissionChain(prisma);
    await expect(chain.handle('user-1', 'convocatoria:crear')).resolves.toBe(
      'ALLOW',
    );
  });

  it('deniega por defecto cuando ninguna instancia lo permite', async () => {
    const prisma = createMockPrisma();
    (prisma.usuarioPermiso.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.rolPermiso.findFirst as jest.Mock).mockResolvedValue(null);

    const chain = buildPermissionChain(prisma);
    await expect(chain.handle('user-1', 'modulo:accion')).resolves.toBe('DENY');
  });

  it('permite con override de usuario PERMITIR sin consultar el rol', async () => {
    const prisma = createMockPrisma();
    (prisma.usuarioPermiso.findFirst as jest.Mock).mockResolvedValue({
      efecto: 'PERMITIR',
    });
    const rolSpy = jest.spyOn(prisma.rolPermiso, 'findFirst');

    const chain = buildPermissionChain(prisma);
    await expect(chain.handle('user-1', 'permiso:editar')).resolves.toBe(
      'ALLOW',
    );
    expect(rolSpy).not.toHaveBeenCalled();
  });

  it('deniega con override de usuario DENEGAR aunque el rol lo permita', async () => {
    const prisma = createMockPrisma();
    (prisma.usuarioPermiso.findFirst as jest.Mock).mockResolvedValue({
      efecto: 'DENEGAR',
    });

    const chain = buildPermissionChain(prisma);
    await expect(chain.handle('user-1', 'convocatoria:crear')).resolves.toBe(
      'DENY',
    );
  });

  it('DefaultDenyHandler niega siempre', async () => {
    const handler = new DefaultDenyHandler();
    await expect(handler.handle()).resolves.toBe('DENY');
  });

  it('buildPermissionChain arma la cadena con cabecera UsuarioPermisoHandler', () => {
    const chain = buildPermissionChain(createMockPrisma());
    expect(chain).toBeInstanceOf(UsuarioPermisoHandler);
  });
});