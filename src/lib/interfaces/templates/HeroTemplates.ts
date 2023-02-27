import type { PositionedItem, PositionedTemplateContainer, PositionedTemplateText, TemplatePositionedText, TemplateText } from "./HtmlTemplates";
import type { ThemeTemplatesEnum } from "./ThemeTemplatesEnum";

export interface HeroSheetTemplate {
    theme_id: number
    template_name: string
    background_image: string
    overlay_image?: string
    icon: PositionedItem
    image: PositionedItem
    background_color?: string
    name: TemplateText
    nameContainer: PositionedTemplateContainer
    keywords: TemplateText
    keywordsContainer: PositionedTemplateContainer
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
        skill: TemplateText
        skillContainer: PositionedTemplateContainer
        focus: TemplateText
        focusContainer: PositionedTemplateContainer
        life: TemplateText
        lifeContainer: PositionedTemplateContainer
        awakening: TemplateText
        awakeningContainer: PositionedTemplateContainer
    }
    action_dice: [PositionedTemplateContainer, PositionedTemplateContainer, PositionedTemplateContainer, PositionedTemplateContainer, PositionedTemplateContainer, PositionedTemplateContainer]
}

export const HeroSheetTemplates: Record<ThemeTemplatesEnum, HeroSheetTemplate> = {
    TMNT: {
        theme_id: 1,
        template_name: 'TMNT',
        background_image: '/images/homebrew%20templates/TMNT/hero_background.png',
        icon: { size: { width: '80px', height: '80px' }, position: { left: '10px', top: '15px' } },
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
        ability_container: { size: { width: '296px', height: '300px' }, position: { left: '395px', top: '144px' } },
        ability_name: { size: { width: '200px', height: '20px' }, position: { left: '100px', top: '200px' }, font: 'bangersregular', fontSize: 32, fontColor: 'black',
            classList: '!text-center skew-x-[1deg] skew-y-[-1deg]'
        },
        ability_effect: { size: { width: '200px', height: '20px' }, position: { left: '100px', top: '200px' }, font: 'smackattack_bbregular', fontSize: 16, fontColor: 'black',
            classList: '!text-center skew-x-[1deg] skew-y-[-1deg]'
        },
        action_dice: [
            { size: { width: '40px', height: '40px' }, position: { left: '368px', top: '500px' } },
            { size: { width: '40px', height: '40px' }, position: { left: '420px', top: '499px' } },
            { size: { width: '40px', height: '40px' }, position: { left: '472px', top: '498px' } },
            { size: { width: '40px', height: '40px' }, position: { left: '524px', top: '497px' } },
            { size: { width: '40px', height: '40px' }, position: { left: '576px', top: '496px' } },
            { size: { width: '40px', height: '40px' }, position: { left: '628px', top: '495px' } }
        ],
        attributes: {
            move: { font: 'bangersregular', fontSize: 32, fontColor: 'white', classList: 'text-outline skew-x-[1.7deg] skew-y-[-1.7deg]' },
            moveContainer: { size: { width: '40px', height: '40px' }, position: { left: '358px', top: '70px' }, classList: 'grid justify-center text-center' },
            attack: { font: 'bangersregular', fontSize: 32, fontColor: 'white', classList: 'text-outline skew-x-[1.7deg] skew-y-[-1.7deg]' },
            attackContainer: { size: { width: '40px', height: '40px' }, position: { left: '412px', top: '70px' }, classList: 'grid justify-center text-center' },
            defend: { font: 'bangersregular', fontSize: 32, fontColor: 'white', classList: 'text-outline skew-x-[1.7deg] skew-y-[-1.7deg]' },
            defendContainer: { size: { width: '40px', height: '40px' }, position: { left: '466px', top: '70px' }, classList: 'grid justify-center text-center' },
            skill: { font: 'bangersregular', fontSize: 32, fontColor: 'white', classList: 'text-outline skew-x-[1.7deg] skew-y-[-1.7deg]' },
            skillContainer: { size: { width: '40px', height: '40px' }, position: { left: '522px', top: '70px' }, classList: 'grid justify-center text-center' },
            focus: { font: 'bangersregular', fontSize: 32, fontColor: 'white', classList: 'text-outline skew-x-[1.7deg] skew-y-[-1.7deg]' },
            focusContainer: { size: { width: '40px', height: '40px' }, position: { left: '574px', top: '70px' }, classList: 'grid justify-center text-center' },
            life: { font: 'bangersregular', fontSize: 32, fontColor: 'black', classList: 'skew-x-[1.7deg] skew-y-[-1.7deg]' },
            lifeContainer: { size: { width: '40px', height: '40px' }, position: { left: '622px', top: '26px' }, classList: 'grid justify-center text-center' },
            awakening: { font: 'bangersregular', fontSize: 20, fontColor: 'white', classList: 'text-outline skew-x-[1.7deg] skew-y-[-1.7deg]' },
            awakeningContainer: { size: { width: '30px', height: '30px' }, position: { left: '644px', top: '66px' }, classList: 'grid justify-center text-center' },
        }
    },
    BTAS: {
        theme_id: 2,
        template_name: 'BTAS',
        background_image: '/images/homebrew%20templates/BTAS/hero_background.png',
        overlay_image: '/images/homebrew%20templates/BTAS/hero_overlay.png',
        icon: { size: { width: '80px', height: '80px' }, position: { left: '10px', top: '15px' } },
        image: { size: { width: '350px', height: '454px' }, position: { left: '0px', top: '112px' } },
        name: { 
            font: 'BebasNeueBold', 
            fontSize: 58,
            fontColor: 'white',
            classList: 'transform scale-y-[138%] [text-shadow:_6px_4px_5px_rgb(0_0_0_/_80%)] tracking-[calc(4px*var(--scale))]' 
        },
        nameContainer: {
            size: { width: '240px', height: '85px' },
            position: { left: '100px', top: '0px' } 
        },
        keywords:  {
            font: 'BebasNeueLight',
            fontSize: 18,
            fontColor: 'white' 
        },
        keywordsContainer: { 
            size: { width: '240px', height: '40px' },
            position: { left: '100px', top: '84px' }
        },
        ability_container: { size: { width: '284px', height: '284px' }, position: { left: '370px', top: '162px' } },
        ability_name: { size: { width: '200px', height: '20px' }, position: { left: '100px', top: '200px' }, font: 'BebasNeueLight', fontSize: 30, fontColor: '#ededed',
            classList: 'w-[130%] ml-[-15%] transform !scale-x-[70%] tracking-[calc(4px*var(--scale))] !text-center mb-[1px] !bg-bottomline [background:_linear-gradient(to_right,_#77777700_5%,_#ffffff70_25%,_#ffffff70_75%,_#77777700_95%)_left_bottom_no-repeat]'
        },
        ability_effect: { size: { width: '190px', height: '20px' }, position: { left: '105px', top: '200px' }, font: 'DINCondensedLightRegular', fontSize: 20, fontColor: '#ededed',
            classList: '!text-left !leading-[calc(calc(var(--fontSize)+calc(1px*var(--scale)))*var(--scale))] !px-[1px]'
        },
        action_dice: [
            { size: { width: '48px', height: '48px' }, position: { left: '350px', top: '491px' } },
            { size: { width: '48px', height: '48px' }, position: { left: '405px', top: '491px' } },
            { size: { width: '48px', height: '48px' }, position: { left: '460px', top: '491px' } },
            { size: { width: '48px', height: '48px' }, position: { left: '515px', top: '491px' } },
            { size: { width: '48px', height: '48px' }, position: { left: '570px', top: '491px' } },
            { size: { width: '48px', height: '48px' }, position: { left: '625px', top: '491px' } }
        ],
        attributes: {
            move: { font: 'BebasNeueBold', fontSize: 52, fontColor: 'white', classList: 'text-outline', strokeColor: '#231f20' },
            moveContainer: { size: { width: '44px', height: '52px' }, position: { left: '350px', top: '88px' }, classList: 'text-center' },
            attack: { font: 'BebasNeueBold', fontSize: 52, fontColor: 'white', classList: 'text-outline', strokeColor: '#231f20' },
            attackContainer: { size: { width: '44px', height: '52px' }, position: { left: '406px', top: '88px' }, classList: 'text-center' },
            defend: { font: 'BebasNeueBold', fontSize: 52, fontColor: 'white', classList: 'text-outline', strokeColor: '#231f20' },
            defendContainer: { size: { width: '44px', height: '52px' }, position: { left: '462px', top: '88px' }, classList: 'text-center' },
            skill: { font: 'BebasNeueBold', fontSize: 52, fontColor: 'white', classList: 'text-outline', strokeColor: '#231f20' },
            skillContainer: { size: { width: '44px', height: '52px' }, position: { left: '517px', top: '88px' }, classList: 'text-center' },
            focus: { font: 'BebasNeueBold', fontSize: 52, fontColor: 'white', classList: 'text-outline', strokeColor: '#231f20' },
            focusContainer: { size: { width: '44px', height: '52px' }, position: { left: '572px', top: '88px' }, classList: 'text-center' },
            life: { font: 'BebasNeueBold', fontSize: 32, fontColor: 'white', classList: 'text-outline', strokeColor: '#231f20' },
            lifeContainer: { size: { width: '44px', height: '52px' }, position: { left: '626px', top: '46px' }, classList: 'text-center' },
            awakening: { font: 'BebasNeueBold', fontSize: 32, fontColor: 'white', classList: 'text-outline', strokeColor: '#231f20' },
            awakeningContainer: { size: { width: '44px', height: '52px' }, position: { left: '626px', top: '105px' }, classList: 'text-center' }
        }
    },
}