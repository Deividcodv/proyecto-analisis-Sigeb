import { IsString, IsOptional, IsBoolean, MinLength, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCatalogoDto {
  @ApiProperty({ example: 'Masculino', description: 'Nombre del catálogo' })
  @IsString()
  @MinLength(2)
  nombre!: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

export class UpdateCatalogoDto {
  @ApiPropertyOptional({ example: 'Masculino' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  nombre?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

export class CreateMunicipioDto extends CreateCatalogoDto {
  @ApiProperty({ description: 'ID del departamento padre' })
  @IsUUID()
  departamentoId!: string;
}

export class UpdateMunicipioDto extends UpdateCatalogoDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  departamentoId?: string;
}