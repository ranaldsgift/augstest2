import type { PositionedItem, PositionedTemplateContainer, PositionedTemplateText } from "./HtmlTemplates";
import type { ThemeTemplatesEnum } from "./ThemeTemplatesEnum";

export interface InitiativeCardTemplate {
    background_image: string
    overlay_image?: string
    image: PositionedItem
    name: PositionedTemplateText
    ability: PositionedTemplateText
}

export const InitiativeCardTemplates: Record<ThemeTemplatesEnum, InitiativeCardTemplate> = {
    TMNT: {
        background_image: '/images/homebrew%20templates/TMNT/initiative_background.png',
        image: { size: { width: '388px', height: '485px' }, position: { left: '0px', top: '81px' } },
        name: { size: { width: '300px', height: '250px' }, position: { left: '25px', top: '200px' }, font: 'bangersregular', font_size: 72, font_color: 'white' },
        ability:  {size: { width: '300px', height: '45px' }, position: { left: '25px', top: '450px' }, font: 'bangersregular', font_size: 22, font_color: 'white' }
    },
    BTAS: {
        background_image: '/images/homebrew%20templates/BTAS/initiative_background.png',
        overlay_image: '/images/homebrew%20templates/BTAS/initiative_overlay.png',
        image: { size: { width: '388px', height: '485px' }, position: { left: '0px', top: '81px' } },
        name: { size: { width: '300px', height: '245px' }, position: { left: '25px', top: '200px' }, font: 'BebasNeueBold', font_size: 72, font_color: 'white' },
        ability:  {size: { width: '300px', height: '40px' }, position: { left: '25px', top: '450px' }, font: 'BebasNeueBold', font_size: 26, font_color: 'white' }
    },
}