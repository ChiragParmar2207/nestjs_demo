import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    example: 'chirag@gmail.com',
    description: 'Registered email address.',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    minLength: 6,
    maxLength: 6,
    pattern: '^\\d{6}$',
    description: 'Six digit OTP sent during forgot password.',
  })
  @IsNotEmpty()
  @IsString()
  @Length(6, 6)
  @Matches(/^\d{6}$/)
  otp: string;

  @ApiProperty({
    example: 'NewTest@123',
    minLength: 8,
    description: 'New account password.',
    writeOnly: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
