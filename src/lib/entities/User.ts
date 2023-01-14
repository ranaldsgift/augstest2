import { Type } from "class-transformer"
import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm"
import { TimestampedEntity } from "./TimestampedEntity"
import { UserRole } from "./UserRole"

@Entity()
export class User extends TimestampedEntity {
    @PrimaryColumn("uuid")
    id: string

    @Column("varchar", { unique: true, nullable: true })
    userName: string
    
    @Type(() => UserRole)
    @ManyToOne(() => UserRole, { eager: true })
    role: UserRole
    
    @Column("varchar", { nullable: true })
    avatar: string
    
    @Column("varchar", { nullable: true })
    discord: string
    
    @Column("varchar", { nullable: true })
    boardgamegeek: string
}