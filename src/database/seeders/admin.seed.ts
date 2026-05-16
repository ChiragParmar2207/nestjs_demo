import { DataSource } from 'typeorm';

import { ROLES } from '../../constants/key.constants';
import { EncryptService } from '../../utils/encrypt.service';
import { User } from '../entities/user.entity';

/**
 * Seeds a default admin user into the database.
 * Skips insertion if an admin with the same email already exists.
 */
export const seedAdmin = async (dataSource: DataSource): Promise<void> => {
  const userRepository = dataSource.getRepository(User);
  const encryptService = new EncryptService();

  const existingAdmin = await userRepository.findOneBy({
    email: 'admin@gmail.com',
  });

  if (existingAdmin) {
    console.log('Admin user already exists skipping');
    return;
  }

  const hashedPassword = await encryptService.hashPassword('Test@123');

  const admin = userRepository.create({
    name: 'admin',
    email: 'admin@gmail.com',
    countryCode: '91',
    phone: '9876543210',
    password: hashedPassword,
    role: ROLES.ADMIN,
    isActive: true,
  });

  await userRepository.save(admin);
  console.log('Admin user seeded successfully.');
};
