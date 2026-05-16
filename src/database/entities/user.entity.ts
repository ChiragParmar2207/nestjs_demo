import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ROLES } from '../../constants/key.constants';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar' })
  countryCode: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  password: string;

  @Column({ type: 'enum', enum: ROLES, default: ROLES.USER })
  role: ROLES;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'timestamptz', default: 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  updatedAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  deletedAt: Date;
}
