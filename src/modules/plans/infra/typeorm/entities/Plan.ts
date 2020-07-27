import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Enterprise from '@modules/enterprises/infra/typeorm/entities/Enterprise';

@Entity('plans')
class Plan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  enterprise_id: string;

  @ManyToOne(() => Enterprise)
  @JoinColumn({ name: 'enterprise_id' })
  enterprise: Enterprise;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  price: number;

  @Column('integer')
  schedule_limit: number;

  @Column('timestamp with time zone')
  expiration_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Plan;
