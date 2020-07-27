import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Users } from "./Users";
import { Plans } from "./Plans";
import { Servicecategory } from "./Servicecategory";
import { UsersEnterprises } from "./UsersEnterprises";
import { UserPlans } from "./UserPlans";

@Index("user_enterprises_users_id_fk", ["ownerId"], {})
@Entity("enterprises", { schema: "nahora" })
export class Enterprises {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "area", length: 255 })
  area: string;

  @Column("varchar", { name: "owner_id", length: 255 })
  ownerId: string;

  @Column("varchar", { name: "address", length: 255 })
  address: string;

  @Column("varchar", { name: "open_hour", length: 255 })
  openHour: string;

  @Column("varchar", { name: "close_hour", length: 255 })
  closeHour: string;

  @Column("varchar", { name: "primary_color", length: 255 })
  primaryColor: string;

  @Column("varchar", { name: "secondary_color", length: 255 })
  secondaryColor: string;

  @Column("tinyint", { name: "private", unsigned: true, default: () => "'1'" })
  private: number;

  @Column("varchar", { name: "logo", length: 255 })
  logo: string;

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

  @ManyToOne(() => Users, (users) => users.enterprises, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "owner_id", referencedColumnName: "id" }])
  owner: Users;

  @OneToMany(() => Plans, (plans) => plans.enterprise)
  plans: Plans[];

  @OneToMany(
    () => Servicecategory,
    (servicecategory) => servicecategory.enterprise
  )
  servicecategories: Servicecategory[];

  @OneToMany(
    () => UsersEnterprises,
    (usersEnterprises) => usersEnterprises.enterprise
  )
  usersEnterprises: UsersEnterprises[];

  @OneToMany(() => UserPlans, (userPlans) => userPlans.enterprise)
  userPlans: UserPlans[];
}
