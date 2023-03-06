import { Type } from "class-transformer"
import { Column, OneToOne, JoinColumn, OneToMany, Entity, PrimaryGeneratedColumn, BaseEntity } from "typeorm"
import { CompetitiveVillainAbility } from "./CompetitiveVillainAbility"
import { CompetitiveVillainAttributes } from "./CompetitiveVillainAttributes"
import { TimestampedEntity } from "./TimestampedEntity"
import { User } from "./User"
import { VillainAbilityCard } from "./VillainAbilityCard"

@Entity()
export class CompetitiveVillain extends TimestampedEntity {
    constructor(userId?: string) {
        super()
        this.attributes = new CompetitiveVillainAttributes(3,3,3,12,0);
    }
    
    @PrimaryGeneratedColumn("increment")
    id: number
    
    @Column("text", { nullable: true })
    description: string

    @Column("varchar", { nullable: true })
    flavorText: string

    @Type(() => CompetitiveVillainAbility)
    @OneToMany(type => CompetitiveVillainAbility, (ability) => ability.villain, { eager: true, cascade: true,  })
    abilities: CompetitiveVillainAbility[]
    
    @Type(() => CompetitiveVillainAttributes)
    @OneToOne(type => CompetitiveVillainAttributes, { eager: true, cascade: true })
    @JoinColumn()
    attributes: CompetitiveVillainAttributes

    @Type(() => VillainAbilityCard)
    @OneToMany(() => VillainAbilityCard, abilityCard => abilityCard.villain, { cascade: true })
    abilityCards: VillainAbilityCard[]

    @Column("smallint", { nullable: true })
    fontSizeAbilityName: number

    @Column("smallint", { nullable: true })
    fontSizeAbilityEffect: number

    public isValid(): boolean {
        return this.validityErrors().length == 0;
    }

    public validityErrors(): string {
        const errors = [];

        if (!this.abilities || this.abilities.length == 0 || this.abilities.some(a => !a.isValid())) {
            errors.push('Abilities');
        }
        
        return errors.join(', ');
    }
}