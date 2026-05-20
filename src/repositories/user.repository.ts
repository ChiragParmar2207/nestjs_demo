import { Injectable } from '@nestjs/common';
import { DataSource, IsNull, Repository } from 'typeorm';

import { User } from '../database/entities/user.entity';

type CreateUserPayload = Pick<
  User,
  'name' | 'email' | 'countryCode' | 'phone' | 'password'
>;

@Injectable()
export class UserRepository {
  private readonly repository: Repository<User>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(User);
  }

  async createUser(payload: CreateUserPayload): Promise<User> {
    const user = this.repository.create(payload);

    return this.repository.save(user);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({
      where: { email, deletedAt: IsNull() },
    });
  }

  async getUserByPhone(
    countryCode: string,
    phone: string,
  ): Promise<User | null> {
    return this.repository.findOne({
      where: { countryCode, phone, deletedAt: IsNull() },
    });
  }

  async updatePassword(userId: string, password: string): Promise<void> {
    await this.repository.update(
      { id: userId },
      { password, updatedAt: new Date() },
    );
  }
}
