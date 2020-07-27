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
import Plan from '@modules/plans/infra/typeorm/entities/Plan';

@Entity('plans_users')
class PlansUsers {
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
  plan_id: string;

  @ManyToOne(() => Plan)
  @JoinColumn({ name: 'plan_id' })
  plan: Plan;

  @Column()
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('timestamp with time zone')
  canceled_at: Date;

  @Column('timestamp with time zone')
  expiration_at: Date;

  @Column('timestamp with time zone')
  paused_at: Date;
}

export default PlansUsers;
