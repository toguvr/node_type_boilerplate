import Enterprises from '@modules/enterprises/infra/typeorm/entities/Enterprise';
import Services from '@modules/services/infra/typeorm/entities/Service';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Index('enterprise_categories_enterprise_id_fk', ['enterpriseId'], {})
@Entity('servicecategory', { schema: 'nahora' })
export default class Servicecategory {
  @Column('varchar', { primary: true, name: 'id', length: 36 })
  id: string;

  @Column('varchar', { name: 'enterprise_id', length: 255 })
  enterpriseId: string;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

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

  @ManyToOne(() => Enterprises, enterprises => enterprises.servicecategories, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'enterprise_id', referencedColumnName: 'id' }])
  enterprise: Enterprises;

  @OneToMany(() => Services, services => services.category)
  services: Services[];
}
