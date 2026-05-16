import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppVersionRepository } from '../repositories/appVersion.repository';
import { OtpRepository } from '../repositories/otp.repository';
import { getTypeOrmConfig } from './typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(getTypeOrmConfig())],
  providers: [AppVersionRepository, OtpRepository],
  exports: [AppVersionRepository, OtpRepository],
})
export class DatabaseModule {}
