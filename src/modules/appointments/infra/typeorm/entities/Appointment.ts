import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import Service from '@modules/services/infra/typeorm/entities/Service';
import Enterprises from '@modules/enterprises/infra/typeorm/entities/Enterprises';

@Index('appointments_enterprise_service_id_fk', ['enterprise_id'], {})
@Index('appointments_service_service_id_fk', ['service_id'], {})
@Index('appointments_users_user_id_fk', ['user_id'], {})
@Entity('appointments', { schema: 'nahora' })
export default class Appointments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'service_id', length: 255 })
  service_id: string;

  @Column('varchar', { name: 'user_id', length: 255 })
  user_id: string;

  @Column('varchar', { name: 'enterprise_id', length: 255 })
  enterprise_id: string;

  @Column('timestamp', { name: 'date', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Service, services => services.appointments, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'service_id', referencedColumnName: 'id' }])
  service: Service;

  @ManyToOne(() => User, users => users.appointments, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(() => Enterprises, enterprises => enterprises.appointments, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'enterprise_id', referencedColumnName: 'id' }])
  enterprise: Enterprises;
}
