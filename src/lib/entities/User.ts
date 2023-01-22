import { Type } from "class-transformer"
import { Entity, Column, PrimaryColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm"
import { Homebrew } from "./Homebrew"
import { TimestampedEntity } from "./TimestampedEntity"
import { UserHomebrewFavorite } from "./UserHomebrewFavorite"
import { UserRole } from "./UserRole"

@Entity()
export class User extends TimestampedEntity {
    @PrimaryColumn("uuid")
    public id: string

    @Column("varchar", { unique: true, nullable: true })
    public userName: string
    
    @Type(() => UserRole)
    @ManyToOne(() => UserRole, { eager: true })
    public role: UserRole
    
    @Column("varchar", { nullable: true })
    public avatar: string
    
    @Column("varchar", { nullable: true })
    public discord: string
    
    @Column("varchar", { nullable: true })
    public boardgamegeek: string

    @Column("int4", { array: true, nullable: true })
    public savedHomebrewIds: number[]

    @ManyToMany(() => Homebrew)
    @JoinTable({ name: "user_saved_homebrews" })
    public savedHomebrews: Homebrew[]

    @OneToMany(() => UserHomebrewFavorite, (save) => save.user, { eager: true })
    public homebrewFavorites: UserHomebrewFavorite[]
}