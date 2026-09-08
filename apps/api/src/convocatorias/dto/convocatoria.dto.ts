import {
  IsString,
  IsOptional,
  IsUUID,
  IsISO8601,
  MinLength,
  IsIn,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ConvocatoriaTransicion } from '../convocatoria-state-machine';

export class CreateConvocatoriaDto {
  @ApiProperty({ example: 'Beca de Excelencia Académica' })
  @IsString()
  @MinLength(3)
  nombre!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ description: 'ID de la beca asociada' })
  @IsUUID()
  becaId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  fechaApertura?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  fechaCierre?: string;
}

export class UpdateConvocatoriaDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(3)
  nombre?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  becaId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  fechaApertura?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  fechaCierre?: string;
}

export class TransicionDto {
  @ApiProperty({ enum: ['publicar', 'cerrar', 'iniciar_evaluacion', 'resolver', 'reabrir', 'archivar'] })
  @IsIn(['publicar', 'cerrar', 'iniciar_evaluacion', 'resolver', 'reabrir', 'archivar'])
  accion!: ConvocatoriaTransicion;
}

export class DocumentoRequeridoItemDto {
  @ApiProperty({ description: 'ID del tipo de documento' })
  @IsUUID()
  documentoTipoId!: string;

  @ApiProperty({ default: true })
  @IsBoolean()
  obligatorio!: boolean;
}

export class DocumentosRequeridosDto {
  @ApiProperty({ type: [DocumentoRequeridoItemDto] })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => DocumentoRequeridoItemDto)
  items!: DocumentoRequeridoItemDto[];
}