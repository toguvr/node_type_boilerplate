import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import Service from '@modules/services/infra/typeorm/entities/Service';

@Index('appointments_service_service_id_fk', ['serviceId'], {})
@Index('appointments_users_user_id_fk', ['userId'], {})
@Entity('appointments', { schema: 'nahora' })
export default class Appointments {
  @Column('varchar', { primary: true, name: 'id', length: 36 })
  id: string;

  @Column('varchar', { name: 'service_id', length: 255 })
  serviceId: string;

  @Column('varchar', { name: 'user_id', length: 255 })
  userId: string;

  @Column('timestamp', { name: 'date', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp', {
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

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
}
