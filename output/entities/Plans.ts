import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Enterprises } from "./Enterprises";
import { UserPlans } from "./UserPlans";

@Index("plans_enterprises_enterprise_id_fk", ["enterpriseId"], {})
@Entity("plans", { schema: "nahora" })
export class Plans {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "enterprise_id", length: 255 })
  enterpriseId: string;

  @Column("decimal", { name: "price", precision: 10, scale: 2 })
  price: string;

  @Column("int", { name: "schedule_limit", unsigned: true })
  scheduleLimit: number;

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

  @Column("datetime", { name: "expiration_date" })
  expirationDate: Date;

  @ManyToOne(() => Enterprises, (enterprises) => enterprises.plans, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "enterprise_id", referencedColumnName: "id" }])
  enterprise: Enterprises;

  @OneToMany(() => UserPlans, (userPlans) => userPlans.plan)
  userPlans: UserPlans[];
}
