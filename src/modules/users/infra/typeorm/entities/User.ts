import {
  Entity,
  Column,
  OneToMany,
  Index,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import uploadConfig from '@config/upload';
import { Exclude, Expose } from 'class-transformer';
import UserPlans from '@modules/plans/infra/typeorm/entities/PlansUsers';
import Usertoken from '@modules/users/infra/typeorm/entities/UserToken';
import UsersEnterprises from '@modules/enterprises/infra/typeorm/entities/EnterprisesUsers';
import Enterprises from '@modules/enterprises/infra/typeorm/entities/Enterprises';
import Appointments from '@modules/appointments/infra/typeorm/entities/Appointment';

@Index('email', ['email'], { unique: true })
@Entity('users', { schema: 'nahora' })
export default class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('varchar', { name: 'email', unique: true, length: 255 })
  email: string;

  @Column('varchar', { name: 'password', length: 255 })
  @Exclude()
  password: string;

  @Column('varchar', { name: 'avatar', nullable: true, length: 255 })
  avatar: string | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Appointments, appointments => appointments.user)
  appointments: Appointments[];

  @OneToMany(() => Enterprises, enterprises => enterprises.owner)
  enterprises: Enterprises[];

  @OneToMany(
    () => UsersEnterprises,
    usersEnterprises => usersEnterprises.user,
    // {
    //   cascade: true,
    //   eager: true,
    // },
  )
  usersEnterprises: UsersEnterprises[];

  @OneToMany(() => Usertoken, usertoken => usertoken.user)
  usertokens: Usertoken[];

  @OneToMany(() => UserPlans, userPlans => userPlans.user)
  userPlans: UserPlans[];

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }
}
