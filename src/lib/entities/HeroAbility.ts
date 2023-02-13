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

    public isValid(): boolean {
        if (!this.name || this.name.length == 0 || !this.effect || this.effect.length == 0) {
            return false;
        }

        return true;
    }
}