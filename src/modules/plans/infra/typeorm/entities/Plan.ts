import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import Enterprises from '@modules/enterprises/infra/typeorm/entities/Enterprises';
import UserPlans from '@modules/plans/infra/typeorm/entities/PlansUsers';

@Index('plans_enterprises_enterprise_id_fk', ['enterprise_id'], {})
@Entity('plans', { schema: 'nahora' })
export default class Plans {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('varchar', { name: 'enterprise_id', length: 255 })
  enterprise_id: string;

  @Column('decimal', { name: 'price', precision: 10, scale: 2 })
  price: string;

  @Column('int', { name: 'schedule_limit', unsigned: true })
  schedule_limit: number;

  @Column('int', { name: 'days_to_expire', unsigned: true })
  days_to_expire: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Enterprises, enterprises => enterprises.plans, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'enterprise_id', referencedColumnName: 'id' }])
  enterprise: Enterprises;

  @OneToMany(() => UserPlans, userPlans => userPlans.plan)
  userPlans: UserPlans[];
}
