import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import {
  apiErrorResponseSchema,
  apiSuccessResponseSchema,
} from '../common/swagger/apiResponse.swagger';
import { MESSAGES } from '../constants/messages.constants';
import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { SendOtpDto } from './dto/sendOtp.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Send OTP to an email address' })
  @ApiOkResponse(apiSuccessResponseSchema(MESSAGES.OTP_SENT))
  @ApiBadRequestResponse(apiErrorResponseSchema(MESSAGES.VALIDATION_FAILED))
  @ApiInternalServerErrorResponse(
    apiErrorResponseSchema(MESSAGES.SOMETHING_WENT_WRONG),
  )
  @HttpCode(HttpStatus.OK)
  @Post('sendOtp')
  sendOtp(@Body() sendOtpDto: SendOtpDto) {
    return this.authService.sendOtp(sendOtpDto);
  }

  @ApiOperation({ summary: 'Register a new user' })
  @ApiOkResponse(
    apiSuccessResponseSchema(MESSAGES.USER_REGISTERED, {
      user: {
        id: '9d09040a-c07f-4e75-8ac2-8f0e57a25319',
        name: 'Chirag Parmar',
        email: 'chirag@gmail.com',
        countryCode: '91',
        phone: '9876543210',
        role: 'user',
        isActive: true,
      },
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    }),
  )
  @ApiBadRequestResponse(
    apiErrorResponseSchema(MESSAGES.VALIDATION_FAILED, [
      MESSAGES.VALIDATION_FAILED,
      MESSAGES.INVALID_OR_EXPIRED_OTP,
    ]),
  )
  @ApiConflictResponse(
    apiErrorResponseSchema(MESSAGES.EMAIL_ALREADY_EXISTS, [
      MESSAGES.EMAIL_ALREADY_EXISTS,
      MESSAGES.PHONE_ALREADY_EXISTS,
    ]),
  )
  @ApiInternalServerErrorResponse(
    apiErrorResponseSchema(MESSAGES.SOMETHING_WENT_WRONG),
  )
  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @ApiOperation({ summary: 'Send forgot password OTP' })
  @ApiOkResponse(apiSuccessResponseSchema(MESSAGES.PASSWORD_RESET_OTP_SENT))
  @ApiBadRequestResponse(apiErrorResponseSchema(MESSAGES.VALIDATION_FAILED))
  @ApiNotFoundResponse(apiErrorResponseSchema(MESSAGES.USER_NOT_FOUND))
  @ApiInternalServerErrorResponse(
    apiErrorResponseSchema(MESSAGES.SOMETHING_WENT_WRONG),
  )
  @HttpCode(HttpStatus.OK)
  @Post('forgotPassword')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @ApiOperation({ summary: 'Reset password using OTP' })
  @ApiOkResponse(apiSuccessResponseSchema(MESSAGES.PASSWORD_RESET))
  @ApiBadRequestResponse(
    apiErrorResponseSchema(MESSAGES.VALIDATION_FAILED, [
      MESSAGES.VALIDATION_FAILED,
      MESSAGES.INVALID_OR_EXPIRED_OTP,
    ]),
  )
  @ApiNotFoundResponse(apiErrorResponseSchema(MESSAGES.USER_NOT_FOUND))
  @ApiInternalServerErrorResponse(
    apiErrorResponseSchema(MESSAGES.SOMETHING_WENT_WRONG),
  )
  @HttpCode(HttpStatus.OK)
  @Post('resetPassword')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @ApiOperation({ summary: 'Login with email and password' })
  @ApiOkResponse(
    apiSuccessResponseSchema(MESSAGES.LOGIN_SUCCESS, {
      user: {
        id: '9d09040a-c07f-4e75-8ac2-8f0e57a25319',
        name: 'Chirag Parmar',
        email: 'chirag@gmail.com',
        countryCode: '91',
        phone: '9876543210',
        role: 'user',
        isActive: true,
      },
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    }),
  )
  @ApiBadRequestResponse(apiErrorResponseSchema(MESSAGES.VALIDATION_FAILED))
  @ApiUnauthorizedResponse(apiErrorResponseSchema(MESSAGES.INVALID_CREDENTIALS))
  @ApiInternalServerErrorResponse(
    apiErrorResponseSchema(MESSAGES.SOMETHING_WENT_WRONG),
  )
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
