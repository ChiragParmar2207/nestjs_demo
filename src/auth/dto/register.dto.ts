import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'Chirag Parmar',
    minLength: 2,
    description: 'Full name of the user.',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({
    example: 'chirag@gmail.com',
    description: 'Unique email address of the user.',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '91',
    pattern: '^\\d{1,4}$',
    description: 'Phone country code.',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\\d{1,4}$/)
  countryCode: string;

  @ApiProperty({
    example: '9876543210',
    pattern: '^\\d{7,15}$',
    description: 'Phone number without country code.',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{7,15}$/)
  phone: string;

  @ApiProperty({
    example: 'Test@123',
    minLength: 8,
    description: 'Password for the account.',
    writeOnly: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: '123456',
    minLength: 6,
    maxLength: 6,
    pattern: '^\\d{6}$',
    description: 'Six digit OTP sent to the email address.',
  })
  @IsNotEmpty()
  @IsString()
  @Length(6, 6)
  @Matches(/^\d{6}$/)
  otp: string;
}
