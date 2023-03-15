import type { PositionedTemplateContainer, PositionedTemplateText, TemplateText } from "./HtmlTemplates";
import type { ThemeTemplatesEnum } from "./ThemeTemplatesEnum";

export interface CompetitiveVillainTemplate {
    background_image: string
    overlay_image?: string
    backBackgroundImage: string
    leaderBackgroundImage?: string
    leaderOverlayImage?: string
    flavorText: TemplateText
    flavorTextContainer: PositionedTemplateContainer
    ability_container: PositionedTemplateContainer
    ability_name: PositionedTemplateText
    ability_effect: PositionedTemplateText
    attributes: {
        move: TemplateText
        moveContainer: PositionedTemplateContainer
        attack: TemplateText
        attackContainer: PositionedTemplateContainer
        defend: TemplateText
        defendContainer: PositionedTemplateContainer
        life: TemplateText
        lifeContainer: PositionedTemplateContainer
        leaderLife: TemplateText
        leaderLifeContainer: PositionedTemplateContainer
        leaderAwakening: TemplateText
        leaderAwakeningContainer: PositionedTemplateContainer
    }
}

export const CompetitiveVillainTemplates: Record<ThemeTemplatesEnum, CompetitiveVillainTemplate> = {
    TMNT: {
        background_image: '/images/homebrew%20templates/TMNT/villain_competitive_background.png',
        leaderBackgroundImage: '/images/homebrew%20templates/TMNT/villain_competitive_leader_background.png',
        backBackgroundImage: '/images/homebrew%20templates/TMNT/villain_competitive_back_background.png',
        flavorText: {
            font: 'smackattack_bbregular',
            fontSize: 16, 
            fontColor: 'white',
            classList: 'skew-x-[1.7deg] skew-y-[-1.7deg] tracking-[calc(2px*var(--scal))]' 
        },
        flavorTextContainer: {
            size: { width: '304px', height: '70px' }, 
            position: { left: '384px', top: '483px' },
        },
        ability_container: { size: { width: '296px', height: '300px' }, position: { left: '395px', top: '144px' } },
        ability_name: { size: { width: '200px', height: '20px' }, position: { left: '100px', top: '200px' }, font: 'bangersregular', fontSize: 32, fontColor: 'black',
            classList: '!text-center skew-x-[1deg] skew-y-[-1deg]'
        },
        ability_effect: { size: { width: '200px', height: '20px' }, position: { left: '100px', top: '200px' }, font: 'smackattack_bbregular', fontSize: 16, fontColor: 'black',
            classList: '!text-center skew-x-[1deg] skew-y-[-1deg]'
        },
        attributes: {
            move: { font: 'bangersregular', fontSize: 32, fontColor: 'white', classList: 'text-outline skew-x-[1.7deg] skew-y-[-1.7deg]' },
            moveContainer: { size: { width: '40px', height: '40px' }, position: { left: '368px', top: '68px' }, classList: 'grid justify-center text-center' },
            attack: { font: 'bangersregular', fontSize: 32, fontColor: 'white', classList: 'text-outline skew-x-[1.7deg] skew-y-[-1.7deg]' },
            attackContainer: { size: { width: '40px', height: '40px' }, position: { left: '448px', top: '68px' }, classList: 'grid justify-center text-center' },
            defend: { font: 'bangersregular', fontSize: 32, fontColor: 'white', classList: 'text-outline skew-x-[1.7deg] skew-y-[-1.7deg]' },
            defendContainer: { size: { width: '40px', height: '40px' }, position: { left: '535px', top: '68px' }, classList: 'grid justify-center text-center' },
            life: { font: 'bangersregular', fontSize: 32, fontColor: 'black', classList: 'skew-x-[1.7deg] skew-y-[-1.7deg]' },
            lifeContainer: { size: { width: '40px', height: '40px' }, position: { left: '619px', top: '35px' }, classList: 'grid justify-center text-center' },
            leaderLife: { font: 'bangersregular', fontSize: 32, fontColor: 'black', classList: 'skew-x-[1.7deg] skew-y-[-1.7deg]' },
            leaderLifeContainer: { size: { width: '40px', height: '40px' }, position: { left: '612px', top: '24px' }, classList: 'grid justify-center text-center' },
            leaderAwakening: { font: 'bangersregular', fontSize: 20, fontColor: 'white', classList: 'text-outline skew-x-[1.7deg] skew-y-[-1.7deg]' },
            leaderAwakeningContainer: { size: { width: '30px', height: '30px' }, position: { left: '639px', top: '64px' }, classList: 'grid justify-center text-center' },
        }
    },
    BTAS: {
        background_image: '/images/homebrew%20templates/BTAS/villain_competitive_background.png',
        overlay_image: '/images/homebrew%20templates/BTAS/villain_competitive_overlay.png',
        leaderBackgroundImage: '/images/homebrew%20templates/BTAS/villain_competitive_background.png',
        leaderOverlayImage: '/images/homebrew%20templates/BTAS/villain_competitive_leader_overlay.png',
        backBackgroundImage: '/images/homebrew%20templates/BTAS/villain_competitive_back_background.png',
        flavorText: {
            font: 'DINCondensedLightRegular',
            fontSize: 18, 
            fontColor: 'white',
            classList: 'italic tracking-[calc(2px*var(--scal))] !leading-[calc(calc(var(--fontSize)+6px)*var(--scale))]' 
        },
        flavorTextContainer: {
            size: { width: '328px', height: '98px' }, 
            position: { left: '354px', top: '467px' },
        },
        ability_container: { size: { width: '284px', height: '284px' }, position: { left: '370px', top: '162px' }, classList: 'z-[3]' },
        ability_name: { size: { width: '200px', height: '20px' }, position: { left: '100px', top: '200px' }, font: 'BebasNeueLight', fontSize: 30, fontColor: 'white',
            classList: 'w-[130%] ml-[-15%] transform !scale-x-[70%] tracking-[calc(4px*var(--scale))] !text-center mb-[1px] !bg-bottomline [background:_linear-gradient(to_right,_#77777700_5%,_#ffffff70_25%,_#ffffff70_75%,_#77777700_95%)_left_bottom_no-repeat]'
        },
        ability_effect: { size: { width: '190px', height: '20px' }, position: { left: '105px', top: '200px' }, font: 'DINCondensedLightRegular', fontSize: 20, fontColor: 'white',
            classList: '!text-left !leading-[calc(calc(var(--fontSize)+calc(1px*var(--scale)))*var(--scale))] !px-[1px]'
        },
        attributes: {
            move: { font: 'BebasNeueBold', fontSize: 52, fontColor: 'white', classList: 'text-outline', strokeColor: '#231f20' },
            moveContainer: { size: { width: '44px', height: '52px' }, position: { left: '367px', top: '88px' }, classList: 'text-center' },
            attack: { font: 'BebasNeueBold', fontSize: 52, fontColor: 'white', classList: 'text-outline', strokeColor: '#231f20' },
            attackContainer: { size: { width: '44px', height: '52px' }, position: { left: '449px', top: '88px' }, classList: 'text-center' },
            defend: { font: 'BebasNeueBold', fontSize: 52, fontColor: 'white', classList: 'text-outline', strokeColor: '#231f20' },
            defendContainer: { size: { width: '44px', height: '52px' }, position: { left: '531px', top: '88px' }, classList: 'text-center' },
            life: { font: 'BebasNeueBold', fontSize: 52, fontColor: 'white', classList: 'text-outline', strokeColor: '#231f20' },
            lifeContainer: { size: { width: '44px', height: '52px' }, position: { left: '613px', top: '88px' }, classList: 'text-center' },
            leaderLife: { font: 'BebasNeueBold', fontSize: 36, fontColor: 'white', classList: 'text-outline', strokeColor: '#231f20' },
            leaderLifeContainer: { size: { width: '44px', height: '52px' }, position: { left: '613px', top: '50px' }, classList: 'text-center' },
            leaderAwakening: { font: 'BebasNeueBold', fontSize: 36, fontColor: 'white', classList: 'text-outline', strokeColor: '#231f20' },
            leaderAwakeningContainer: { size: { width: '44px', height: '52px' }, position: { left: '613px', top: '102px' }, classList: 'text-center' }
        }
    },
}