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
import Enterprises from '@modules/enterprises/infra/typeorm/entities/Enterprises';
import Services from '@modules/services/infra/typeorm/entities/Service';

@Index('enterprise_categories_enterprise_id_fk', ['enterprise_id'], {})
@Entity('servicecategory', { schema: 'nahora' })
export default class Servicecategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'enterprise_id', length: 255 })
  enterprise_id: string;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Enterprises, enterprises => enterprises.servicecategories, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'enterprise_id', referencedColumnName: 'id' }])
  enterprise: Enterprises;

  @OneToMany(() => Services, services => services.category)
  services: Services[];
}
