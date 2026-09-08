import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignPermisoDto {
  @ApiProperty({ example: ['uuid1', 'uuid2'], description: 'IDs de permisos a asignar' })
  @IsArray()
  @IsString({ each: true })
  permisoIds!: string[];
}
