import { DiceIconsEnum, HomebrewCategoriesEnum } from "$lib/enums/Enums";
import { Transform } from "class-transformer";
import { Type } from "class-transformer";
import type { Database } from "src/schema";
import { HomebrewModel } from "./HomebrewModel";
import type { ThemeTemplatesEnum } from "./templates/ThemeTemplatesEnum";

export type HeroEntity = Database["public"]["Tables"]["heroes"]["Row"];
export type HeroEntityView = Database["public"]["Views"]["heroes_table"]["Row"];

export class HeroModel extends HomebrewModel {

    constructor(userId: string) {
        super(userId, HomebrewCategoriesEnum.Heroes);

        this.actionDice = [ DiceIconsEnum.Move, DiceIconsEnum.Melee, DiceIconsEnum.Defend, DiceIconsEnum.Range, DiceIconsEnum.DefendMelee, DiceIconsEnum.Focus ];
        this.diceIconColor = "#343434";
        this.diceBackgroundColor = "#adadad";
        this.sheetBackgroundColor = "#727272";
    }

    themeId?: number //change to ThemeModel
    
    theme?: ThemeTemplatesEnum
    @Type(() => Number)
    tokenId?: number //change to TokenModel
    sheetBackgroundColor?: string
    diceIconColor?: string
    diceBackgroundColor?: string
    traitKeywords?: string
    @Type(() => String)
    @Transform(prop => Array.isArray(prop.value) ? prop.value : [prop.value])
    abilityNames?: string[]
    @Type(() => String)
    @Transform(prop => Array.isArray(prop.value) ? prop.value : [prop.value])
    abilityEffects?: string[]
    iconImage?: string
    heroImage?: string
    @Type(() => Number)
    heroImageScale?: number
    @Type(() => Number)
    imagePositionLeft?: number;
    @Type(() => Number)
    imagePositionTop?: number;
    @Type(() => Number)
    moveAttribute?: number
    @Type(() => Number)
    attackAttribute?: number
    @Type(() => Number)
    defendAttribute?: number
    @Type(() => Number)
    skillAttribute?: number
    @Type(() => Number)
    focusAttribute?: number
    @Type(() => Number)
    lifeAttribute?: number
    @Type(() => Number)
    awakeningAttribute?: number

    @Transform(prop => prop.value.toString().split(','))
    actionDice?: [DiceIconsEnum, DiceIconsEnum, DiceIconsEnum, DiceIconsEnum, DiceIconsEnum, DiceIconsEnum]
    isSupportFigure?: boolean

    @Transform(prop => !isNaN(parseInt(prop.value)) ? parseInt(prop.value) : 0)
    nameFontSize?: number
    @Transform(prop => !isNaN(parseInt(prop.value)) ? parseInt(prop.value) : 0)
    keywordsFontSize?: number
    @Transform(prop => !isNaN(parseInt(prop.value)) ? parseInt(prop.value) : 0)
    abilityNameFontSize?: number
    @Transform(prop => !isNaN(parseInt(prop.value)) ? parseInt(prop.value) : 0)
    abilityEffectFontSize?: number

    username?: string

    ratings?: number

    public isValid(): boolean {
        if (!this.name || !this.traitKeywords || !this.moveAttribute || (!this.abilityNames || this.abilityNames.length == 0) || !this.heroImage || !this.iconImage) {
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
        if (!this.traitKeywords) {
            errors.push('Keywords');
        }
        if (!this.heroImage) {
            errors.push('Hero Image')
        }
        if (!this.iconImage) {
            errors.push('Icon Image')
        }
        if (!this.abilityNames || this.abilityNames.length == 0) {
            errors.push('Ability Name');
        }
        if (!this.abilityEffects || this.abilityEffects.length == 0) {
            errors.push('Ability Effect');
        }
        
        return errors.join(', ');
    }
}
