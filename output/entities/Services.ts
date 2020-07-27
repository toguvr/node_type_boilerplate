import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Appointments } from "./Appointments";
import { Servicecategory } from "./Servicecategory";
import { Servicedescription } from "./Servicedescription";

@Index("pending_scheduling", ["pendingScheduling"], {})
@Index("service_categories_category_id_fk", ["categoryId"], {})
@Index("service_descriptions_description_id_fk", ["descriptionId"], {})
@Entity("services", { schema: "nahora" })
export class Services {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "start_hour", length: 255 })
  startHour: string;

  @Column("varchar", { name: "description_id", length: 255 })
  descriptionId: string;

  @Column("varchar", { name: "category_id", length: 255 })
  categoryId: string;

  @Column("int", { name: "capacity", unsigned: true })
  capacity: number;

  @Column("int", { name: "day_week", unsigned: true })
  dayWeek: number;

  @Column("tinyint", {
    name: "pending_scheduling",
    unsigned: true,
    default: () => "'0'",
  })
  pendingScheduling: number;

  @Column("varchar", { name: "time_schedule", length: 255 })
  timeSchedule: string;

  @Column("varchar", { name: "user_name", length: 255 })
  userName: string;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp", {
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @OneToMany(() => Appointments, (appointments) => appointments.service)
  appointments: Appointments[];

  @ManyToOne(
    () => Servicecategory,
    (servicecategory) => servicecategory.services,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "category_id", referencedColumnName: "id" }])
  category: Servicecategory;

  @ManyToOne(
    () => Servicedescription,
    (servicedescription) => servicedescription.services,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "description_id", referencedColumnName: "id" }])
  description: Servicedescription;
}
