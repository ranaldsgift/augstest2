import { SkillCardIconsEnum } from "$lib/enums/Enums"
import { Type } from "class-transformer"
import { Column, ChildEntity, ManyToOne, OneToOne, JoinColumn } from "typeorm"
import { Hero } from "./Hero"
import { Homebrew } from "./Homebrew"
import { Image } from "./Image"
import { User } from "./User"

@ChildEntity()
export class SkillCard extends Homebrew {
    constructor(userId?: string) {
        super();

        if (userId && userId.length > 0) {
            this.user = new User();
            this.user.id = userId;
        }

        this.name ="Into The Shadows"
        this.description = "This is a skill card"
        this.effect = `Place a smoke token in up to 3 different spaces that are within 2 spaces of Leo and in his line of sight.
            While this card is active, Clan Hamato figures suffer no penalty when making a melee strike into or out of obscuring terrain. 
            When this card is no longer active, remove the smoke tokens.`
        this.image = new Image();
        this.image.url = 'https://i.imgur.com/KyEyMCI.png'
    }

    @Type(() => Image)
    @OneToOne(type => Image, { eager: true, cascade: true })
    @JoinColumn()
    image: Image

    @Column("varchar")
    effect: string

    @Column({
        type: "enum",
        enum: SkillCardIconsEnum,
        array: true
    })
    iconCost: SkillCardIconsEnum[]
    
    @Type(() => Hero)
    @ManyToOne(type => Hero, hero => hero.skillCards, { nullable: true })
    hero: Hero
}