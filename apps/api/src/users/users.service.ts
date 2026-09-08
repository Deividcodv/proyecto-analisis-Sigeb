import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { AssignPermisoDto } from './dto/assign-permiso.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAllRoles() {
    return this.prisma.rol.findMany({
      include: {
        rolPermisos: {
          include: { permiso: true },
        },
      },
    });
  }

  async findRolById(id: string) {
    const rol = await this.prisma.rol.findUnique({
      where: { id },
      include: {
        rolPermisos: {
          include: { permiso: true },
        },
      },
    });

    if (!rol) {
      throw new NotFoundException(`Rol con id ${id} no encontrado`);
    }

    return rol;
  }

  async createRol(dto: CreateRolDto) {
    const existing = await this.prisma.rol.findUnique({
      where: { nombre: dto.nombre },
    });

    if (existing) {
      throw new ConflictException(`El rol "${dto.nombre}" ya existe`);
    }

    return this.prisma.rol.create({
      data: {
        nombre: dto.nombre,
        descripcion: dto.descripcion,
      },
    });
  }

  async updateRol(id: string, dto: UpdateRolDto) {
    await this.findRolById(id);

    if (dto.nombre) {
      const existing = await this.prisma.rol.findFirst({
        where: { nombre: dto.nombre, id: { not: id } },
      });

      if (existing) {
        throw new ConflictException(`El rol "${dto.nombre}" ya existe`);
      }
    }

    return this.prisma.rol.update({
      where: { id },
      data: dto,
    });
  }

  async deleteRol(id: string) {
    await this.findRolById(id);

    const usersWithRole = await this.prisma.usuario.count({
      where: { rolId: id },
    });

    if (usersWithRole > 0) {
      throw new ConflictException(
        `No se puede eliminar el rol: ${usersWithRole} usuario(s) lo tienen asignado`,
      );
    }

    return this.prisma.rol.delete({ where: { id } });
  }

  async assignPermisoToRol(rolId: string, dto: AssignPermisoDto) {
    await this.findRolById(rolId);

    await this.prisma.rolPermiso.deleteMany({
      where: { rolId },
    });

    const rolPermisos = dto.permisoIds.map((permisoId) => ({
      rolId,
      permisoId,
    }));

    await this.prisma.rolPermiso.createMany({
      data: rolPermisos,
    });

    return this.findRolById(rolId);
  }

  async findAllPermisos() {
    return this.prisma.permiso.findMany();
  }
}
