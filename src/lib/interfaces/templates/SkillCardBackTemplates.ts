import type { PositionedItem, PositionedTemplateContainer, PositionedTemplateText } from "./HtmlTemplates";
import type { ThemeTemplatesEnum } from "./ThemeTemplatesEnum";

export interface SkillCardBackTemplate {
    backgroundImage: string
    overlayImage?: string
    image: PositionedTemplateContainer
}

export const SkillCardBackTemplates: Record<ThemeTemplatesEnum, SkillCardBackTemplate> = {
    TMNT: {
        backgroundImage: '/images/homebrew%20templates/TMNT/skill_card_back_background.png',
        overlayImage: '/images/homebrew%20templates/TMNT/skill_card_back_overlay.png',
        image: { size: { width: '388px', height: '485px' }, position: { left: '0px', top: '81px' } },
    },
    BTAS: {
        backgroundImage: '/images/homebrew%20templates/BTAS/skill_card_back_background.png',
        image: { size: { width: '388px', height: '485px' }, position: { left: '0px', top: '81px' } },
    },
}