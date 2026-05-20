import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { MESSAGES } from '../constants/messages.constants';
import { User } from '../database/entities/user.entity';
import { OtpRepository } from '../repositories/otp.repository';
import { UserRepository } from '../repositories/user.repository';
import { EncryptService } from '../utils/encrypt.service';
import { JwtService } from '../utils/jwt.service';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { SendOtpDto } from './dto/sendOtp.dto';

type AuthUser = Omit<User, 'password'>;

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly otpRepository: OtpRepository,
    private readonly encryptService: EncryptService,
    private readonly jwtService: JwtService,
  ) {}

  // Normalize email by trimming and converting to lowercase
  private normalizeEmail(email: string | undefined): string {
    return email?.trim().toLowerCase() ?? '';
  }

  // Generate 6 digit OTP
  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Verify OTP
  private async verifyOtp(email: string, otp: string): Promise<void> {
    const otpRecord = await this.otpRepository.getOtp(email);

    if (!otpRecord || otpRecord.otp !== otp) {
      throw new BadRequestException(MESSAGES.INVALID_OR_EXPIRED_OTP);
    }

    await this.otpRepository.deleteOtp(otpRecord.id);
  }

  // Convert user to AuthUser
  private sanitizeUser(user: User): AuthUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      countryCode: user.countryCode,
      phone: user.phone,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    };
  }

  async sendOtp(sendOtpDto: SendOtpDto) {
    const email = this.normalizeEmail(sendOtpDto.email);

    const otp = this.generateOtp();
    await this.otpRepository.createOtp(email, otp);

    return { message: MESSAGES.OTP_SENT };
  }

  async register(registerDto: RegisterDto) {
    const email = this.normalizeEmail(registerDto.email);

    const existingUser = await this.userRepository.getUserByEmail(email);
    if (existingUser) {
      throw new ConflictException(MESSAGES.EMAIL_ALREADY_EXISTS);
    }

    const existingPhoneUser = await this.userRepository.getUserByPhone(
      registerDto.countryCode,
      registerDto.phone,
    );
    if (existingPhoneUser) {
      throw new ConflictException(MESSAGES.PHONE_ALREADY_EXISTS);
    }

    await this.verifyOtp(email, registerDto.otp);

    const hashedPassword = await this.encryptService.hashPassword(
      registerDto.password,
    );
    const user = await this.userRepository.createUser({
      ...registerDto,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.createToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      message: MESSAGES.USER_REGISTERED,
      user: this.sanitizeUser(user),
      token,
    };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const email = this.normalizeEmail(forgotPasswordDto.email);

    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException(MESSAGES.USER_NOT_FOUND);
    }

    const otp = this.generateOtp();
    await this.otpRepository.createOtp(email, otp);

    return { message: MESSAGES.PASSWORD_RESET_OTP_SENT };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const email = this.normalizeEmail(resetPasswordDto.email);

    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException(MESSAGES.USER_NOT_FOUND);
    }

    await this.verifyOtp(email, resetPasswordDto.otp);

    const hashedPassword = await this.encryptService.hashPassword(
      resetPasswordDto.password,
    );
    await this.userRepository.updatePassword(user.id, hashedPassword);

    return { message: MESSAGES.PASSWORD_RESET };
  }

  async login(loginDto: LoginDto) {
    const email = this.normalizeEmail(loginDto.email);

    const user = await this.userRepository.getUserByEmail(email);
    if (!user || !user.isActive) {
      throw new UnauthorizedException(MESSAGES.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await this.encryptService.comparePassword(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException(MESSAGES.INVALID_CREDENTIALS);
    }

    const token = this.jwtService.createToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      message: MESSAGES.LOGIN_SUCCESS,
      user: this.sanitizeUser(user),
      token,
    };
  }
}
