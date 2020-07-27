import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import Users from '@modules/users/infra/typeorm/entities/User';

@Index('user_id', ['userId'], {})
@Entity('usertoken', { schema: 'nahora' })
export default class Usertoken {
  @Column('varchar', { primary: true, name: 'id', length: 36 })
  id: string;

  @Column('varchar', { name: 'token', length: 255 })
  token: string;

  @Column('varchar', { name: 'user_id', length: 255 })
  userId: string;

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

  @ManyToOne(() => Users, users => users.usertokens, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
