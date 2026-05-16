import { DataSource } from 'typeorm';

import { DEVICE_TYPES } from '../../constants/key.constants';
import { AppVersion } from '../entities/appVersion.entity';

const appVersions = [
  { deviceType: DEVICE_TYPES.ANDROID, version: '1' },
  { deviceType: DEVICE_TYPES.IOS, version: '1.0.0' },
];

export const seedAppVersions = async (
  dataSource: DataSource,
): Promise<void> => {
  const appVersionRepository = dataSource.getRepository(AppVersion);

  for (const appVersion of appVersions) {
    const existingAppVersion = await appVersionRepository.findOneBy({
      deviceType: appVersion.deviceType,
    });

    if (existingAppVersion) {
      console.log(
        `${appVersion.deviceType} app version already exists skipping`,
      );
      continue;
    }

    await appVersionRepository.save(appVersionRepository.create(appVersion));
    console.log(`${appVersion.deviceType} app version seeded successfully.`);
  }
};
