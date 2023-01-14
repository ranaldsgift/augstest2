import { DiceIconTemplates, type DiceIconTemplate } from "./DiceIconTemplates";
import { HeroSheetTemplates, type HeroSheetTemplate } from "./HeroTemplates";
import { ThemeTemplatesEnum } from "./ThemeTemplatesEnum";

export interface ThemeTemplate {
    theme: ThemeTemplatesEnum
    heroSheet: HeroSheetTemplate
    diceIcons: DiceIconTemplate
}

export const ThemeTemplates: Record<ThemeTemplatesEnum, ThemeTemplate> = {
    TMNT: {
        theme: ThemeTemplatesEnum.TMNT,
        heroSheet: HeroSheetTemplates[ThemeTemplatesEnum.TMNT],
        diceIcons: DiceIconTemplates[ThemeTemplatesEnum.TMNT]
    },
    BTAS: {
        theme: ThemeTemplatesEnum.BTAS,
        heroSheet: HeroSheetTemplates[ThemeTemplatesEnum.BTAS],
        diceIcons: DiceIconTemplates[ThemeTemplatesEnum.BTAS]
    }
}