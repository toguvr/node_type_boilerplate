import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import Enterprises from '@modules/enterprises/infra/typeorm/entities/Enterprises';
import Users from '@modules/users/infra/typeorm/entities/User';
import Plans from '@modules/plans/infra/typeorm/entities/Plan';

@Index('active', ['active'], {})
@Index('user_plans_users_id_fk', ['userId'], {})
@Index('user_plans_plans_id_fk', ['planId'], {})
@Index('user_plans_enterprise_id_fk', ['enterpriseId'], {})
@Entity('user_plans', { schema: 'nahora' })
export default class UserPlans {
  @Column('varchar', { primary: true, name: 'id', length: 255 })
  id: string;

  @Column('varchar', { name: 'user_id', length: 255 })
  userId: string;

  @Column('varchar', { name: 'plan_id', length: 255 })
  planId: string;

  @Column('varchar', { name: 'enterprise_id', length: 255 })
  enterpriseId: string;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', {
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column('datetime', { name: 'canceled_at', nullable: true })
  canceledAt: Date | null;

  @Column('datetime', { name: 'paused_at', nullable: true })
  pausedAt: Date | null;

  @Column('datetime', { name: 'expiration_at', nullable: true })
  expirationAt: Date | null;

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
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
