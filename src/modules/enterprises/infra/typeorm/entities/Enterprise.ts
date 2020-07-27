import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import { Expose } from 'class-transformer';
import uploadConfig from '@config/upload';
import EnterprisesUsers from '@modules/enterprises/infra/typeorm/entities/EnterprisesUsers';

@Entity('enterprises')
class Enterprise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  area: string;

  @Column()
  owner_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column()
  address: string;

  @Column()
  open_hour: string;

  @Column()
  close_hour: string;

  @Column()
  primary_color: string;

  @Column()
  secondary_color: string;

  @Column()
  private: boolean;

  @Column()
  logo: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => EnterprisesUsers,
    enterprisesUsers => enterprisesUsers.enterprise,
    {
      cascade: true,
      eager: true,
    },
  )
  enterprises_users: EnterprisesUsers[];

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

export default Enterprise;
