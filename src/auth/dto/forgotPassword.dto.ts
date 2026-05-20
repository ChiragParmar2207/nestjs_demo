import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    example: 'chirag@gmail.com',
    description: 'Registered email address for password recovery.',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
