import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuditService } from './audit.service';
import { Permisos } from '../common/decorators/permisos.decorator';

@ApiTags('Audit')
@Controller('audit')
@ApiBearerAuth()
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  @Permisos('auditoria:ver')
  @ApiOperation({ summary: 'Listar entradas de auditoría (admin)' })
  @ApiQuery({ name: 'entidad', required: false })
  @ApiQuery({ name: 'accion', required: false })
  @ApiQuery({ name: 'usuarioId', required: false })
  @ApiQuery({ name: 'desde', required: false })
  @ApiQuery({ name: 'hasta', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  listar(
    @Query('entidad') entidad?: string,
    @Query('accion') accion?: string,
    @Query('usuarioId') usuarioId?: string,
    @Query('desde') desde?: string,
    @Query('hasta') hasta?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.auditService.listar({
      entidad,
      accion,
      usuarioId,
      desde,
      hasta,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });
  }
}