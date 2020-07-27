import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import Enterprise from '@modules/enterprises/infra/typeorm/entities/Enterprise';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('orders_products')
class EnterprisesUsers {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  enterprise_id: string;

  @ManyToOne(() => Enterprise)
  @JoinColumn({ name: 'enterprise_id' })
  enterprise: Enterprise;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  accepted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EnterprisesUsers;
