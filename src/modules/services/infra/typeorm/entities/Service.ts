import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import ServiceDescription from '@modules/services/infra/typeorm/entities/ServiceDescription';
import ServiceCategory from '@modules/services/infra/typeorm/entities/ServiceCategory';

@Entity('appointments')
class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  startHour: string;

  @Column()
  description_id: string;

  @ManyToOne(() => ServiceDescription)
  @JoinColumn({ name: 'description_id' })
  description: ServiceDescription;

  @Column()
  category_id: string;

  @ManyToOne(() => ServiceCategory)
  @JoinColumn({ name: 'category_id' })
  category: ServiceCategory;

  @Column('integer')
  capacity: number;

  @Column('integer')
  dayWeek: number;

  @Column()
  pending_scheduling: boolean;

  @Column()
  time_schedule: string;

  @Column()
  user_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Service;
