import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { DEVICE_TYPES } from '../constants/key.constants';
import { AppVersion } from '../database/entities/appVersion.entity';

@Injectable()
export class AppVersionRepository {
  private readonly repository: Repository<AppVersion>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(AppVersion);
  }

  async getAppVersionByDeviceType(
    deviceType: DEVICE_TYPES,
  ): Promise<AppVersion | null> {
    return this.repository.findOneBy({ deviceType });
  }
}
