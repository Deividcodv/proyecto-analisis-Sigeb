import { IsString, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRolDto {
  @ApiProperty({ example: 'EVALUADOR', description: 'Nombre del rol' })
  @IsString()
  @MaxLength(50)
  nombre!: string;

  @ApiPropertyOptional({ example: 'Rol para evaluadores de solicitudes' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  descripcion?: string;
}
