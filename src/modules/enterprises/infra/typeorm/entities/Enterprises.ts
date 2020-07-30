import { Expose } from 'class-transformer';
import uploadConfig from '@config/upload';

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
import Users from '@modules/users/infra/typeorm/entities/User';
import UsersEnterprises from '@modules/enterprises/infra/typeorm/entities/EnterprisesUsers';
import Plans from '@modules/plans/infra/typeorm/entities/Plan';
import Servicecategory from '@modules/services/infra/typeorm/entities/ServiceCategory';
import UserPlans from '@modules/plans/infra/typeorm/entities/PlansUsers';
import ServiceDescription from '@modules/services/infra/typeorm/entities/ServiceDescription';
import Service from '@modules/services/infra/typeorm/entities/Service';
import Appointments from '@modules/appointments/infra/typeorm/entities/Appointment';

@Index('user_enterprises_users_id_fk', ['owner_id'], {})
@Entity('enterprises', { schema: 'nahora' })
export default class Enterprises {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('varchar', { name: 'area', length: 255 })
  area: string;

  @Column('varchar', { name: 'owner_id', length: 255 })
  owner_id: string;

  @Column('varchar', { name: 'address', length: 255 })
  address: string;

  @Column('varchar', { name: 'open_hour', length: 255 })
  open_hour: string;

  @Column('varchar', { name: 'close_hour', length: 255 })
  close_hour: string;

  @Column('varchar', { name: 'primary_color', length: 255 })
  primary_color: string;

  @Column('varchar', { name: 'secondary_color', length: 255 })
  secondary_color: string;

  @Column('tinyint', {
    name: 'isPrivate',
    unsigned: true,
    default: () => "'1'",
  })
  isPrivate: number;

  @Column('varchar', { name: 'logo', nullable: true, length: 255 })
  logo: string | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Users, users => users.enterprises, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'owner_id', referencedColumnName: 'id' }])
  owner: Users;

  @OneToMany(() => Plans, plans => plans.enterprise)
  plans: Plans[];

  @OneToMany(
    () => Servicecategory,
    servicecategory => servicecategory.enterprise,
  )
  servicecategories: Servicecategory[];

  @OneToMany(
    () => ServiceDescription,
    servicedescription => servicedescription.enterprise,
  )
  servicedescription: ServiceDescription[];

  @OneToMany(() => Service, services => services.enterprise)
  services: Service[];

  @OneToMany(
    () => UsersEnterprises,
    usersEnterprises => usersEnterprises.enterprise,
  )
  usersEnterprises: UsersEnterprises[];

  @OneToMany(() => UserPlans, userPlans => userPlans.enterprise)
  userPlans: UserPlans[];

  @OneToMany(() => Appointments, appointments => appointments.enterprise)
  appointments: Appointments[];

  @Expose({ name: 'logo_url' })
  getLogoUrl(): string | null {
    if (!this.logo) {
      return null;
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.logo}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.logo}`;
      default:
        return null;
    }
  }
}
