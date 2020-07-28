import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Servicedescription from '@modules/services/infra/typeorm/entities/ServiceDescription';
import Servicecategory from '@modules/services/infra/typeorm/entities/ServiceCategory';
import Appointments from '@modules/appointments/infra/typeorm/entities/Appointment';

@Index('pending_scheduling', ['pending_scheduling'], {})
@Index('service_categories_category_id_fk', ['category_id'], {})
@Index('service_descriptions_description_id_fk', ['description_id'], {})
@Entity('services', { schema: 'nahora' })
export default class Services {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'start_hour', length: 255 })
  start_hour: string;

  @Column('varchar', { name: 'description_id', length: 255 })
  description_id: string;

  @Column('varchar', { name: 'category_id', length: 255 })
  category_id: string;

  @Column('int', { name: 'capacity', unsigned: true })
  capacity: number;

  @Column('int', { name: 'day_week', unsigned: true })
  day_week: number;

  @Column('tinyint', {
    name: 'pending_scheduling',
    unsigned: true,
    default: () => "'0'",
  })
  pending_scheduling: number;

  @Column('varchar', { name: 'time_schedule', length: 255 })
  time_schedule: string;

  @Column('varchar', { name: 'user_name', length: 255 })
  user_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Appointments, appointments => appointments.service)
  appointments: Appointments[];

  @ManyToOne(
    () => Servicecategory,
    servicecategory => servicecategory.services,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: Servicecategory;

  @ManyToOne(
    () => Servicedescription,
    servicedescription => servicedescription.services,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'description_id', referencedColumnName: 'id' }])
  description: Servicedescription;
}
