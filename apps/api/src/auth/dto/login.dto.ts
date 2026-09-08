import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'juan@test.com', description: 'Correo electrónico' })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email!: string;

  @ApiProperty({ example: 'Password123!', description: 'Contraseña' })
  @IsString()
  @MinLength(1)
  password!: string;
}
