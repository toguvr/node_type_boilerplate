import { Expose } from 'class-transformer';
import uploadConfig from '@config/upload';

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import Users from '@modules/users/infra/typeorm/entities/User';
import UsersEnterprises from '@modules/enterprises/infra/typeorm/entities/EnterprisesUsers';
import Plans from '@modules/plans/infra/typeorm/entities/Plan';
import Servicecategory from '@modules/services/infra/typeorm/entities/ServiceCategory';
import UserPlans from '@modules/plans/infra/typeorm/entities/PlansUsers';

@Index('user_enterprises_users_id_fk', ['ownerId'], {})
@Entity('enterprises', { schema: 'nahora' })
export default class Enterprises {
  @Column('varchar', { primary: true, name: 'id', length: 36 })
  id: string;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('varchar', { name: 'area', length: 255 })
  area: string;

  @Column('varchar', { name: 'owner_id', length: 255 })
  ownerId: string;

  @Column('varchar', { name: 'address', length: 255 })
  address: string;

  @Column('varchar', { name: 'open_hour', length: 255 })
  openHour: string;

  @Column('varchar', { name: 'close_hour', length: 255 })
  closeHour: string;

  @Column('varchar', { name: 'primary_color', length: 255 })
  primaryColor: string;

  @Column('varchar', { name: 'secondary_color', length: 255 })
  secondaryColor: string;

  @Column('tinyint', { name: 'private', unsigned: true, default: () => "'1'" })
  private: number;

  @Column('varchar', { name: 'logo', length: 255 })
  logo: string;

  @Column('timestamp', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp', {
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

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
    () => UsersEnterprises,
    usersEnterprises => usersEnterprises.enterprise,
  )
  usersEnterprises: UsersEnterprises[];

  @OneToMany(() => UserPlans, userPlans => userPlans.enterprise)
  userPlans: UserPlans[];

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
