import type { PositionedItem, PositionedTemplateContainer, PositionedTemplateText, TemplateText } from "./HtmlTemplates";
import type { ThemeTemplatesEnum } from "./ThemeTemplatesEnum";

export interface SkillCardTemplate {
    background_image: string
    overlay_image?: string
    image: PositionedItem
    name: TemplateText
    nameContainer: PositionedTemplateContainer
    ability: TemplateText
    abilityContainer: PositionedTemplateContainer
    characterName: TemplateText
    characterNameContainer: PositionedTemplateContainer
}

export const SkillCardTemplates: Record<ThemeTemplatesEnum, SkillCardTemplate> = {
    TMNT: {
        background_image: '/images/homebrew%20templates/TMNT/skill-card-background.png',
        overlay_image: '/images/homebrew%20templates/TMNT/skill-card-overlay.png',
        image: { 
            size: { width: '388px', height: '485px' },
            position: { left: '0px', top: '81px' } },
        name: {
            font: 'bangersregular',
            fontSize: 62,
            fontColor: 'white',
            classList: 'whitespace-nowrap z-[31] tracking-[1px] transform rotate-[-2deg] !text-center grid content-center'
        },
        nameContainer: {
            size: { width: '428px', height: '80px' }, 
            position: { left: '80px', top: '396px' },
        },
        ability:  {
            font: 'smackattack_bbregular',
            fontSize: 20,
            fontColor: 'black',
            classList: 'h-full font-bold italic !text-center'
        },
        abilityContainer: {
            size: { width: '426px', height: '205px' },
            position: { left: '80px', top: '488px' },
        },
        characterName:  {
            font: 'smackattack_bbregular',
            fontSize: 16,
            fontColor: 'white' 
        },
        characterNameContainer: {
            size: { width: '426px', height: '25px' }, 
            position: { left: '80px', top: '704px' },
            classList: 'grid h-full items-center justify-center'
        }
    },
    BTAS: {
        background_image: '/images/homebrew%20templates/BTAS/skill-card-background.png',
        overlay_image: '/images/homebrew%20templates/TMNT/skill-card-overlay.png',
        image: { 
            size: { width: '388px', height: '485px' }, 
            position: { left: '0px', top: '81px' }
        },
        name: { 
            font: 'BebasNeueRegular', 
            fontSize: 48, 
            fontColor: 'white', 
            classList: 'transform scale-x-[75%] h-full !leading-[1] tracking-[4px] items-center !text-center !grid whitespace-nowrap !mr-[-4px]'
        },
        nameContainer: {
            size: { width: '447px', height: '86px' }, 
            position: { left: '70px', top: '400px' },
            classList: 'overflow-hidden !grid justify-center items-center !bg-bottomline [background:_linear-gradient(to_right,_#77777700_0px,_#ffffff70_15%,_#ffffff_50%,_#ffffff70_85%,_#77777700_100%)_left_bottom_no-repeat]'
        },
        ability:  {
            font: 'DINCondensedLightRegular', 
            fontSize: 30, 
            fontColor: 'white',
            classList: 'h-full !text-center pt-[1px] px-[10px] !leading-[1] grid content-center'
        },
        abilityContainer: {
            size: { width: '447px', height: '244px' }, 
            position: { left: '70px', top: '484px' },
        },
        characterName:  {
            font: 'BebasNeueBold', 
            fontSize: 28, 
            fontColor: 'white',
        },
        characterNameContainer: {
            size: { width: '447px', height: '35px' }, 
            position: { left: '70px', top: '726px' },
            classList: 'grid h-full items-center justify-center'
        }
    },
}