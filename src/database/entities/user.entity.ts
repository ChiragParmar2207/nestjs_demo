import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ROLES } from '../../constants/key.constants';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'userId' })
  userId: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 150 })
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

  @Column({ type: 'varchar', length: 10 })
  createdAt: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  updatedAt: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  deletedAt: string;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = Math.floor(Date.now() / 1000).toString();
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = Math.floor(Date.now() / 1000).toString();
  }
}
