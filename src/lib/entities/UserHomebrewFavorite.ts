import { Type } from "class-transformer"
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm"
import { Hero } from "./Hero"
import { Homebrew } from "./Homebrew"
import { User } from "./User"

@Entity()
export class UserHomebrewFavorite extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number

    @Column("uuid")
    public userId!: string

    @Column("int4")
    public homebrewId!: number

    @Type(() => User)
    @ManyToOne(() => User, (user) => user.homebrewFavorites)
    public user!: User

    @Type(() => Homebrew)
    @ManyToOne(() => Homebrew, (homebrew) => homebrew.userFavorites)
    public homebrew!: Homebrew
}