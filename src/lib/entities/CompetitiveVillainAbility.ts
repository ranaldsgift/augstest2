import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from "typeorm"
import { CompetitiveVillain } from "./CompetitiveVillain"

@Entity()
export class CompetitiveVillainAbility extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number

    @ManyToOne(() => CompetitiveVillain, (villain) => villain.abilities)
    villain: CompetitiveVillain

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