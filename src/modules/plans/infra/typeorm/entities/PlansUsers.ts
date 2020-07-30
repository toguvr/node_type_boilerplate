import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Enterprises from '@modules/enterprises/infra/typeorm/entities/Enterprises';
import Users from '@modules/users/infra/typeorm/entities/User';
import Plans from '@modules/plans/infra/typeorm/entities/Plan';

@Index('active', ['active'], {})
@Index('user_plans_users_id_fk', ['user_id'], {})
@Index('user_plans_plans_id_fk', ['plan_id'], {})
@Index('user_plans_enterprise_id_fk', ['enterprise_id'], {})
@Entity('user_plans', { schema: 'nahora' })
export default class UserPlans {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'user_id', length: 255 })
  user_id: string;

  @Column('varchar', { name: 'plan_id', length: 255 })
  plan_id: string;

  @Column('varchar', { name: 'enterprise_id', length: 255 })
  enterprise_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('datetime', { name: 'canceled_at', nullable: true })
  canceled_at: Date | null;

  @Column('datetime', { name: 'paused_at', nullable: true })
  paused_at: Date | null;

  @Column('datetime', { name: 'expiration_at', nullable: true })
  expiration_at: Date | null;

  @Column('tinyint', { name: 'active', unsigned: true, default: () => "'1'" })
  active: number;

  @ManyToOne(() => Enterprises, enterprises => enterprises.userPlans, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'enterprise_id', referencedColumnName: 'id' }])
  enterprise: Enterprises;

  @ManyToOne(() => Plans, plans => plans.userPlans, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'plan_id', referencedColumnName: 'id' }])
  plan: Plans;

  @ManyToOne(() => Users, users => users.userPlans, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
