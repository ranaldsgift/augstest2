import { DiceIconsEnum } from "$lib/enums/Enums"
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

@Entity()
export class HeroActionDice extends BaseEntity {
    constructor(iconColor?: string, backgroundColor?: string, dice?: [DiceIconsEnum, DiceIconsEnum, DiceIconsEnum, DiceIconsEnum, DiceIconsEnum, DiceIconsEnum]) {
        super()
        this.iconColor = iconColor ?? '#ffffff';
        this.backgroundColor = backgroundColor ?? '#777777';
        this.dice = dice ?? [ DiceIconsEnum.Move, DiceIconsEnum.Melee, DiceIconsEnum.Range, DiceIconsEnum.DoubleMove, DiceIconsEnum.DefendMelee, DiceIconsEnum.Focus]
    }

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column("varchar")
    iconColor: string

    @Column("varchar")
    backgroundColor: string

    @Column({
        type: "enum",
        enum: DiceIconsEnum,
        array: true
    })
    dice: [DiceIconsEnum, DiceIconsEnum, DiceIconsEnum, DiceIconsEnum, DiceIconsEnum, DiceIconsEnum]
}