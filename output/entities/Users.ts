import { Column, Entity, Index, OneToMany } from "typeorm";
import { Appointments } from "./Appointments";
import { Enterprises } from "./Enterprises";
import { UsersEnterprises } from "./UsersEnterprises";
import { Usertoken } from "./Usertoken";
import { UserPlans } from "./UserPlans";

@Index("email", ["email"], { unique: true })
@Entity("users", { schema: "nahora" })
export class Users {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "email", unique: true, length: 255 })
  email: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("varchar", { name: "avatar", length: 255 })
  avatar: string;

  @Column("datetime", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp", {
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @OneToMany(() => Appointments, (appointments) => appointments.user)
  appointments: Appointments[];

  @OneToMany(() => Enterprises, (enterprises) => enterprises.owner)
  enterprises: Enterprises[];

  @OneToMany(
    () => UsersEnterprises,
    (usersEnterprises) => usersEnterprises.user
  )
  usersEnterprises: UsersEnterprises[];

  @OneToMany(() => Usertoken, (usertoken) => usertoken.user)
  usertokens: Usertoken[];

  @OneToMany(() => UserPlans, (userPlans) => userPlans.user)
  userPlans: UserPlans[];
}
