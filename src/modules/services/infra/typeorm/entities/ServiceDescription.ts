import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import Services from '@modules/services/infra/typeorm/entities/Service';
import Enterprises from '@modules/enterprises/infra/typeorm/entities/Enterprises';

@Index('enterprise_description_enterprise_id_fk', ['enterprise_id'], {})
@Entity('servicedescription', { schema: 'nahora' })
export default class Servicedescription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'enterprise_id', length: 255 })
  enterprise_id: string;

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

  @ManyToOne(() => Enterprises, enterprises => enterprises.servicedescription, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'enterprise_id', referencedColumnName: 'id' }])
  enterprise: Enterprises;
}
