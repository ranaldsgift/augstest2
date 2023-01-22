import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm"
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

    @ManyToOne(() => User, (user) => user.homebrewFavorites)
    public user!: User

    @ManyToOne(() => Homebrew, (homebrew) => homebrew.userSaves)
    public homebrew!: Homebrew
}