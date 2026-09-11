import {
  IsString,
  IsOptional,
  IsUUID,
  IsIn,
  IsNumber,
  IsInt,
  IsBoolean,
  Min,
  Max,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SolicitudTransicion } from '../solicitud-state-machine';

const TRANSICIONES: SolicitudTransicion[] = [
  'enviar',
  'iniciar_revision',
  'solicitar_correccion',
  'corregir',
  'evaluar',
  'aprobar',
  'rechazar',
];

export class CreateSolicitudDto {
  @ApiProperty({ description: 'ID de la convocatoria a la que se postula' })
  @IsUUID()
  convocatoriaId!: string;
}

export class TransicionSolicitudDto {
  @ApiProperty({ enum: TRANSICIONES })
  @IsIn(TRANSICIONES)
  accion!: SolicitudTransicion;

  @ApiPropertyOptional({ description: 'Comentario registrado en el historial' })
  @IsOptional()
  @IsString()
  comentario?: string;
}

export class PerfilAcademicoDto {
  @ApiPropertyOptional({ description: 'ID del género (excluye generoOtro)' })
  @IsOptional()
  @IsUUID()
  generoId?: string;

  @ApiPropertyOptional({ description: 'Valor libre de género (US-13)' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  generoOtro?: string;

  @ApiPropertyOptional({ description: 'ID del nivel académico (excluye nivelAcademicoOtro)' })
  @IsOptional()
  @IsUUID()
  nivelAcademicoId?: string;

  @ApiPropertyOptional({ description: 'Valor libre de nivel académico (US-13)' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nivelAcademicoOtro?: string;

  @ApiPropertyOptional({ description: 'ID del departamento (excluye departamentoOtro)' })
  @IsOptional()
  @IsUUID()
  departamentoId?: string;

  @ApiPropertyOptional({ description: 'Valor libre de departamento (US-13)' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  departamentoOtro?: string;

  @ApiPropertyOptional({ description: 'ID del municipio (excluye municipioOtro)' })
  @IsOptional()
  @IsUUID()
  municipioId?: string;

  @ApiPropertyOptional({ description: 'Valor libre de municipio (US-13)' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  municipioOtro?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  institucion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  carrera?: string;

  @ApiPropertyOptional({ description: 'Promedio (0-100)' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100)
  promedio?: number;
}

export class MarcarEstadoDocumentoDto {
  @ApiProperty({ description: 'Estado a asignar al documento más reciente del tipo (retro S3)' })
  @IsIn(['RECHAZADO'])
  estado!: 'RECHAZADO';
}

export class PerfilFinancieroDto {
  @ApiPropertyOptional({ description: 'Ingreso familiar mensual' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  ingresoFamiliar?: number;

  @ApiPropertyOptional({ description: 'Número de dependientes' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  numeroDependientes?: number;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  becasAnteriores?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  descripcionSituacion?: string;
}