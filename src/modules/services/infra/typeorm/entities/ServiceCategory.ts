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

@Entity('serviceCategories')
class ServiceCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  enterprise_id: string;

  @ManyToOne(() => Enterprise)
  @JoinColumn({ name: 'enterprise_id' })
  enterprise: Enterprise;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ServiceCategory;
