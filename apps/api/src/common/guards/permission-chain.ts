import { PrismaService } from '../../prisma/prisma.service';

export type PermissionDecision = 'ALLOW' | 'DENY' | 'PASS';

export class PermissionHandler {
  protected next: PermissionHandler | null = null;

  setNext(handler: PermissionHandler): PermissionHandler {
    this.next = handler;
    return this;
  }

  handle(_userId: string, _permisoKey: string): Promise<PermissionDecision> {
    throw new Error('Method not implemented');
  }

  protected async toNext(userId: string, permisoKey: string) {
    if (!this.next) {
      return 'DENY' as PermissionDecision;
    }
    return this.next.handle(userId, permisoKey);
  }
}

export class RolPermisoHandler extends PermissionHandler {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async handle(userId: string, permisoKey: string): Promise<PermissionDecision> {
    const [modulo, accion] = permisoKey.split(':');

    const rolPermiso = await this.prisma.rolPermiso.findFirst({
      where: {
        permiso: { modulo, accion },
        rol: { usuarios: { some: { id: userId } } },
      },
    });

    if (rolPermiso) {
      return 'ALLOW';
    }

    return this.toNext(userId, permisoKey);
  }
}

export class UsuarioPermisoHandler extends PermissionHandler {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async handle(userId: string, permisoKey: string): Promise<PermissionDecision> {
    const [modulo, accion] = permisoKey.split(':');

    const usuarioPermiso = await this.prisma.usuarioPermiso.findFirst({
      where: {
        usuarioId: userId,
        permiso: { modulo, accion },
      },
    });

    if (usuarioPermiso) {
      return usuarioPermiso.efecto === 'PERMITIR' ? 'ALLOW' : 'DENY';
    }

    return this.toNext(userId, permisoKey);
  }
}

export class DefaultDenyHandler extends PermissionHandler {
  async handle(): Promise<PermissionDecision> {
    return 'DENY' as PermissionDecision;
  }
}

export function buildPermissionChain(
  prisma: PrismaService,
): PermissionHandler {
  const usuarioHandler = new UsuarioPermisoHandler(prisma);
  const rolHandler = new RolPermisoHandler(prisma);
  const denyHandler = new DefaultDenyHandler();

  usuarioHandler.setNext(rolHandler);
  rolHandler.setNext(denyHandler);

  return usuarioHandler;
}