import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Enterprises from '@modules/enterprises/infra/typeorm/entities/Enterprises';
import Users from '@modules/users/infra/typeorm/entities/User';

@Index('accepted', ['accepted'], {})
@Index('users_enterprises_enterprise_id_fk', ['enterprise_id'], {})
@Index('users_enterprises_user_id_fk', ['user_id'], {})
@Entity('users_enterprises', { schema: 'nahora' })
export default class UsersEnterprises {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'enterprise_id', length: 255 })
  enterprise_id: string;

  @Column('varchar', { name: 'user_id', length: 255 })
  user_id: string;

  @Column('tinyint', { name: 'accepted', unsigned: true, default: () => "'0'" })
  accepted: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Enterprises, enterprises => enterprises.usersEnterprises, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'enterprise_id', referencedColumnName: 'id' }])
  enterprise: Enterprises;

  @ManyToOne(() => Users, users => users.usersEnterprises, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
