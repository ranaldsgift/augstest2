import type { PositionedItem, PositionedTemplateContainer, PositionedTemplateText, TemplateText } from "./HtmlTemplates";
import type { ThemeTemplatesEnum } from "./ThemeTemplatesEnum";

export interface InitiativeCardTemplate {
    background_image: string
    overlay_image?: string
    image: PositionedItem
    name: PositionedTemplateText
    nameText: TemplateText
    ability: PositionedTemplateText
    abilityText: TemplateText
}

export const InitiativeCardTemplates: Record<ThemeTemplatesEnum, InitiativeCardTemplate> = {
    TMNT: {
        background_image: '/images/homebrew%20templates/TMNT/initiative_background.png',
        image: { size: { width: '388px', height: '485px' }, position: { left: '0px', top: '81px' } },
        name: { size: { width: '300px', height: '250px' }, position: { left: '25px', top: '200px' }, font: 'bangersregular', fontSize: 72, fontColor: 'white', classList: "flex text-center justify-end items-center" },
        nameText: { font: 'bangersregular', fontSize: 72, fontColor: 'white', classList: 'text-outline' },
        ability:  { size: { width: '300px', height: '45px' }, position: { left: '25px', top: '450px' }, font: 'bangersregular', fontSize: 22, fontColor: 'white', classList: "flex items-center" },
        abilityText: { font: 'bangersregular', fontSize: 22, fontColor: 'white', strokeWidth: 'calc(8px*var(--scale))', classList: 'text-outline pt-[calc(4px*var(--scale))]' }
    },
    BTAS: {
        background_image: '/images/homebrew%20templates/BTAS/initiative_background.png',
        overlay_image: '/images/homebrew%20templates/BTAS/initiative_overlay.png',
        image: { size: { width: '388px', height: '485px' }, position: { left: '0px', top: '81px' } },
        name: { size: { width: '300px', height: '245px' }, position: { left: '25px', top: '200px' }, font: 'BebasNeueBold', fontSize: 72, fontColor: 'white', classList: "flex text-center justify-end items-center" },
        nameText: { font: 'BebasNeueBold', fontSize: 72, fontColor: 'white', lineHeight: '58px',
            classList: "tracking-[calc(4px*var(--scale))] scale-x-[80%] scale-y-[110%] bg-gradient-to-b from-[#e4e5e8] via-[#e4e5e8] to-[#8c8c8e] bg-clip-text !text-transparent box-decoration-clone" 
        },
        ability: { size: { width: '300px', height: '40px' }, position: { left: '25px', top: '450px' }, font: 'BebasNeueBold', fontSize: 26, fontColor: 'white', classList: "flex justify-start items-center" },
        abilityText: { font: 'BebasNeueBold', fontSize: 26, fontColor: 'white',
            classList: "tracking-[calc(2px*var(--scale))] bg-gradient-to-b from-[#e4e5e8] via-[#e4e5e8] to-[#8c8c8e] bg-clip-text !text-transparent box-decoration-clone" 
        }
    },
}