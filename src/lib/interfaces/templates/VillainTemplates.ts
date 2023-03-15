import { CompetitiveVillainTemplates, type CompetitiveVillainTemplate } from "./CompetitiveVillainTemplates";
import { CooperativeVillainTemplates, type CooperativeVillainTemplate } from "./CooperativeVillainTemplates";
import type { PositionedItem, PositionedTemplateContainer, PositionedTemplateText, TemplateText } from "./HtmlTemplates";
import type { ThemeTemplatesEnum } from "./ThemeTemplatesEnum";

export interface VillainTemplate {
    icon: PositionedTemplateContainer
    image: PositionedItem
    background_color?: string
    name: TemplateText
    nameContainer: PositionedTemplateContainer
    keywords: TemplateText
    keywordsContainer: PositionedTemplateContainer
    cooperative: CooperativeVillainTemplate
    competitive: CompetitiveVillainTemplate
}

export const VillainTemplates: Record<ThemeTemplatesEnum, VillainTemplate> = {
    TMNT: {
        icon: { size: { width: '66px', height: '66px' }, position: { left: '17px', top: '22px' }, classList: 'bg-black rounded-full box shadow-[0_0_0_calc(3px*var(--scale))_white,0_0_0_calc(6px*var(--scale))_black]' },
        image: { size: { width: '350px', height: '454px' }, position: { left: '0px', top: '112px' } },
        name: {
            font: 'bangersregular',
            fontSize: 50, 
            fontColor: 'black',
            classList: 'skew-x-[1.7deg] skew-y-[-1.7deg] tracking-[calc(2px*var(--scal))]' 
        },
        nameContainer: {
            size: { width: '240px', height: '70px' }, 
            position: { left: '100px', top: '0px' },
        },
        keywords:  {
            font: 'bangersregular', 
            fontSize: 20, 
            fontColor: 'black' 
        },
        keywordsContainer: {
            size: { width: '240px', height: '42px' }, 
            position: { left: '100px', top: '64px' },
            classList: 'skew-x-[1.7deg] skew-y-[-1.7deg]' 
        },
        competitive: CompetitiveVillainTemplates.TMNT,
        cooperative: CooperativeVillainTemplates.TMNT
    },
    BTAS: {
        icon: { size: { width: '68px', height: '68px' }, position: { left: '22px', top: '28px' }, classList: 'rounded-full' },
        image: { size: { width: '350px', height: '454px' }, position: { left: '0px', top: '112px' } },
        name: { 
            font: 'BebasNeueBold', 
            fontSize: 58,
            fontColor: 'white',
            classList: 'transform scale-y-[138%] [text-shadow:_6px_4px_5px_rgb(0_0_0_/_80%)] tracking-[calc(4px*var(--scale))]' 
        },
        nameContainer: {
            size: { width: '232px', height: '85px' },
            position: { left: '108px', top: '0px' } 
        },
        keywords:  {
            font: 'BebasNeueLight',
            fontSize: 18,
            fontColor: 'white',
            classList: 'tracking-[calc(1px*var(--scale))]'
        },
        keywordsContainer: { 
            size: { width: '232px', height: '40px' },
            position: { left: '110px', top: '84px' }
        },
        competitive: CompetitiveVillainTemplates.BTAS,
        cooperative: CooperativeVillainTemplates.BTAS
    },
}