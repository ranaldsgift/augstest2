import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from "typeorm"
import { CooperativeVillain } from "./CooperativeVillain"

@Entity()
export class CooperativeVillainAbility extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number

    @ManyToOne(type => CooperativeVillain)
    villain: CooperativeVillain

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