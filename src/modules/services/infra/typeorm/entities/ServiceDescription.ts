import { Column, Entity, OneToMany } from 'typeorm';
import Services from '@modules/services/infra/typeorm/entities/Service';

@Entity('servicedescription', { schema: 'nahora' })
export default class Servicedescription {
  @Column('varchar', { primary: true, name: 'id', length: 36 })
  id: string;

  @Column('varchar', { name: 'title', length: 255 })
  title: string;

  @Column('varchar', { name: 'description', length: 255 })
  description: string;

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

  @OneToMany(() => Services, services => services.description)
  services: Services[];
}
