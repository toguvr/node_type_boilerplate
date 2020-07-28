import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Generated,
} from 'typeorm';
import Users from '@modules/users/infra/typeorm/entities/User';

@Index('user_id', ['user_id'], {})
@Entity('usertoken', { schema: 'nahora' })
export default class Usertoken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'token', length: 255 })
  @Generated('uuid')
  token: string;

  @Column('varchar', { name: 'user_id', length: 255 })
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Users, users => users.usertokens, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
