import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Enterprises } from "./Enterprises";
import { Users } from "./Users";

@Index("accepted", ["accepted"], {})
@Index("users_enterprises_enterprise_id_fk", ["enterpriseId"], {})
@Index("users_enterprises_user_id_fk", ["userId"], {})
@Entity("users_enterprises", { schema: "nahora" })
export class UsersEnterprises {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "enterprise_id", length: 255 })
  enterpriseId: string;

  @Column("varchar", { name: "user_id", length: 255 })
  userId: string;

  @Column("tinyint", { name: "accepted", unsigned: true, default: () => "'0'" })
  accepted: number;

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

  @ManyToOne(() => Enterprises, (enterprises) => enterprises.usersEnterprises, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "enterprise_id", referencedColumnName: "id" }])
  enterprise: Enterprises;

  @ManyToOne(() => Users, (users) => users.usersEnterprises, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
