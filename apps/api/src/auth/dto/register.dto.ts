import { IsString, IsEmail, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: '1234567890123', description: 'CUI del usuario (13 dígitos)' })
  @IsString()
  @Matches(/^\d{13}$/, { message: 'El CUI debe tener exactamente 13 dígitos' })
  cui!: string;

  @ApiProperty({ example: 'Juan Pérez', description: 'Nombres completos' })
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  nombres!: string;

  @ApiProperty({ example: 'juan@test.com', description: 'Correo electrónico' })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email!: string;

  @ApiProperty({ example: 'Password123!', description: 'Contraseña (mín 8 caracteres)' })
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(128)
  password!: string;
}
