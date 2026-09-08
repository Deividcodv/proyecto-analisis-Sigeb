import { IsString, IsOptional, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateRolDto {
  @ApiPropertyOptional({ example: 'EVALUADOR Senior' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  nombre?: string;

  @ApiPropertyOptional({ example: 'Rol actualizado' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  descripcion?: string;
}
