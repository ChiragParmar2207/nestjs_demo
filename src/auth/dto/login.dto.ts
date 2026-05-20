import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'chirag@gmail.com',
    description: 'Registered email address.',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Test@123',
    description: 'Account password.',
    writeOnly: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
