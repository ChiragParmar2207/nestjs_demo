import { Injectable } from '@nestjs/common';
import { DataSource, LessThan, Repository } from 'typeorm';

import { Otp } from '../database/entities/otp.entity';

@Injectable()
export class OtpRepository {
  private readonly repository: Repository<Otp>;
  private readonly ttlInMinutes = 10;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Otp);
  }

  async createOtp(email: string, otp: string): Promise<Otp> {
    await this.deleteExpiredOtpRecords();
    await this.repository.delete({ email });

    const otpRecord = this.repository.create({ email, otp });

    return this.repository.save(otpRecord);
  }

  async getOtp(email: string): Promise<Otp | null> {
    await this.deleteExpiredOtpRecords();

    return this.repository.findOne({ where: { email } });
  }

  async deleteOtp(id: string): Promise<void> {
    await this.repository.delete({ id });
  }

  async deleteExpiredOtpRecords(): Promise<void> {
    const expiryDate = new Date(Date.now() - this.ttlInMinutes * 60 * 1000);

    await this.repository.delete({ createdAt: LessThan(expiryDate) });
  }
}
