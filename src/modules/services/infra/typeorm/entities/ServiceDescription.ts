import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import Services from '@modules/services/infra/typeorm/entities/Service';

@Entity('servicedescription', { schema: 'nahora' })
export default class Servicedescription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'title', length: 255 })
  title: string;

  @Column('varchar', { name: 'description', length: 255 })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Services, services => services.description)
  services: Services[];
}
