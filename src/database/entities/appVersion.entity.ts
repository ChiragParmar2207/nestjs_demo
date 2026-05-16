import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DEVICE_TYPES } from '../../constants/key.constants';

@Entity('appVersions')
export class AppVersion {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ type: 'enum', enum: DEVICE_TYPES, unique: true, nullable: false })
  deviceType: DEVICE_TYPES;

  @Column({ type: 'varchar', length: 10 })
  versionCode: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
