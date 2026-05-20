import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendOtpDto {
  @ApiProperty({
    example: 'chirag@gmail.com',
    description: 'Email address where the OTP will be sent.',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
