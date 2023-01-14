import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from "typeorm"
import { Hero } from "./Hero"

@Entity()
export class HeroAbility extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number

    @ManyToOne(type => Hero)
    hero: Hero

    @Column("varchar")
    name: string

    @Column("text")
    effect: string
}