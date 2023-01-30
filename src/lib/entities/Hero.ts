import { AugsLicensesEnum } from "$lib/enums/Enums"
import { ThemeTemplatesEnum } from "$lib/interfaces/templates/ThemeTemplatesEnum"
import { Type } from "class-transformer"
import { Column, ChildEntity, OneToOne, JoinColumn, OneToMany } from "typeorm"
import { HeroAbility } from "./HeroAbility"
import { HeroActionDice } from "./HeroActionDice"
import { HeroAttributes } from "./HeroAttributes"
import { Homebrew } from "./Homebrew"
import { Image } from "./Image"
import { SkillCard } from "./SkillCard"
import { Token } from "./Token"
import { User } from "./User"

@ChildEntity()
export class Hero extends Homebrew {
    constructor(userId?: string) {
        super()
        this.augsLicense = AugsLicensesEnum.Homebrew;
        this.attributes = new HeroAttributes(3,3,3,3,3,15,8);
        this.theme = ThemeTemplatesEnum.TMNT;
        this.sheetBackgroundColor = "#777777";
        this.actionDice = new HeroActionDice();

        if (userId) {
            this.user = new User();
            this.user.id = userId;
        }
        
        this.iconImage = new Image();
        this.heroImage = new Image();
    }
    
    @Column({
        type: "enum",
        enum: ThemeTemplatesEnum,
        default: ThemeTemplatesEnum.TMNT
    })
    theme: ThemeTemplatesEnum

    @Type(() => Token)
    @OneToOne(type => Token, { eager: true, nullable: true, cascade: true })
    @JoinColumn()
    token: Token
    
    @Type(() => HeroActionDice)
    @OneToOne(type => HeroActionDice, { eager: true, cascade: true })
    @JoinColumn()
    actionDice: HeroActionDice

    @Type(() => HeroAbility)
    @OneToMany(type => HeroAbility, (ability) => ability.hero, { eager: true, cascade: true })
    abilities: HeroAbility[]
    
    @Type(() => HeroAttributes)
    @OneToOne(type => HeroAttributes, { eager: true, cascade: true })
    @JoinColumn()
    attributes: HeroAttributes

    @Type(() => SkillCard)
    @OneToMany(() => SkillCard, skillCard => skillCard.hero, { cascade: true })
    skillCards: SkillCard[]

    @Type(() => Image)
    @OneToOne(type => Image, { eager: true, cascade: true })
    @JoinColumn()
    iconImage: Image

    @Type(() => Image)
    @OneToOne(type => Image, { eager: true, cascade: true })
    @JoinColumn()
    heroImage: Image

    @Column("smallint", { nullable: true })
    fontSizeHeroName: number
    
    @Column("smallint", { nullable: true })
    fontSizeKeywords: number

    @Column("smallint", { nullable: true })
    fontSizeAbilityName: number

    @Column("smallint", { nullable: true })
    fontSizeAbilityEffect: number

    @Column("varchar", { array: true })
    keywords: string[]

    @Column("varchar")    
    sheetBackgroundColor: string

    public isValid(): boolean {
        if (!this.name || !this.keywords || this.keywords.length == 0 || !this.abilities || this.abilities.length == 0 || !this.heroImage || this.heroImage.url?.length == 0 || !this.iconImage || this.iconImage.url?.length == 0) {
            return false;
        }

        return true;
    }

    public validityErrors(): string {
        if (this.isValid()) {
            return '';
        }

        var errors = [];

        if (!this.name) {
            errors.push('Hero Name');
        }
        if (!this.keywords || this.keywords.length == 0) {
            errors.push('Keywords');
        }
        if (!this.heroImage || this.heroImage.url?.length == 0) {
            errors.push('Hero Image')
        }
        if (!this.iconImage || this.iconImage.url?.length == 0) {
            errors.push('Icon Image')
        }
        if (!this.abilities || this.abilities.length == 0) {
            errors.push('Ability Name');
        }
        
        return errors.join(', ');
    }
}