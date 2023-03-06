import { VillainTargetAttributeEnum, VillainTargetPriorityEnum } from "$lib/enums/Enums"
import { Type } from "class-transformer"
import { Column, ChildEntity, OneToOne, JoinColumn, OneToMany, Entity, PrimaryGeneratedColumn, BaseEntity } from "typeorm"
import { CooperativeVillainAbility } from "./CooperativeVillainAbility"
import { CooperativeVillainAttributes } from "./CooperativeVillainAttributes"
import { Token } from "./Token"
import { User } from "./User"

@Entity()
export class CooperativeVillain extends BaseEntity {
    constructor(userId?: string) {
        super()
        this.attributes = new CooperativeVillainAttributes(3,3,3,3);
        this.targetPriority = VillainTargetPriorityEnum.Highest;
        this.targetAttribute = VillainTargetAttributeEnum.Life;
        this.optimalStrikeRange = 1;
    }
    
    @PrimaryGeneratedColumn("increment")
    id: number
    
    @Column("text", { nullable: true })
    description: string

    @Type(() => Token)
    @OneToOne(type => Token, { eager: true, nullable: true, cascade: true })
    @JoinColumn()
    token: Token

    @Type(() => CooperativeVillainAbility)
    @OneToMany(type => CooperativeVillainAbility, (ability) => ability.villain, { eager: true, cascade: true,  })
    abilities: CooperativeVillainAbility[]
    
    @Type(() => CooperativeVillainAttributes)
    @OneToOne(type => CooperativeVillainAttributes, { eager: true, cascade: true })
    @JoinColumn()
    attributes: CooperativeVillainAttributes

    @Column({
        type: "enum",
        enum: VillainTargetPriorityEnum,
        default: VillainTargetPriorityEnum.Highest
    })
    targetPriority: VillainTargetPriorityEnum
    
    @Column({
        type: "enum",
        enum: VillainTargetAttributeEnum,
        default: VillainTargetAttributeEnum.Life
    })
    targetAttribute: VillainTargetAttributeEnum
    
    @Column("smallint")
    optimalStrikeRange: number

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