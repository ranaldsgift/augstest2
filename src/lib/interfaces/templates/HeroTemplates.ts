import type { PositionedItem, PositionedTemplateContainer, PositionedTemplateText } from "./HtmlTemplates";
import type { ThemeTemplatesEnum } from "./ThemeTemplatesEnum";

export interface HeroSheetTemplate {
    theme_id: number
    template_name: string
    background_image: string
    overlay_image?: string
    icon: PositionedItem
    image: PositionedItem
    background_color?: string
    name: PositionedTemplateText
    traits: PositionedTemplateText
    ability_container: PositionedTemplateContainer
    ability_name: PositionedTemplateText
    ability_effect: PositionedTemplateText
    move_value: PositionedTemplateText
    attack_value: PositionedTemplateText
    defend_value: PositionedTemplateText
    skill_value: PositionedTemplateText
    focus_value: PositionedTemplateText
    life_value: PositionedTemplateText
    awakening_value: PositionedTemplateText
    action_dice: [PositionedTemplateContainer, PositionedTemplateContainer, PositionedTemplateContainer, PositionedTemplateContainer, PositionedTemplateContainer, PositionedTemplateContainer]
}

export const HeroSheetTemplates: Record<ThemeTemplatesEnum, HeroSheetTemplate> = {
    TMNT: {
        theme_id: 1,
        template_name: 'TMNT',
        background_image: '/images/homebrew%20templates/TMNT/hero_overlay.png',
        icon: { size: { width: '80px', height: '80px' }, position: { left: '10px', top: '15px' } },
        image: { size: { width: '350px', height: '454px' }, position: { left: '0px', top: '112px' } },
        name: { size: { width: '240px', height: '64px' }, position: { left: '100px', top: '0px' }, font: 'bangersregular', fontSize: 50, fontColor: 'black', lineHeight: 0.7, 
            classList: 'skew-x-[1.7deg] skew-y-[-1.7deg] tracking-[2px]' 
        },
        traits:  {size: { width: '240px', height: '42px' }, position: { left: '100px', top: '64px' }, font: 'bangersregular', fontSize: 20, fontColor: 'black' },
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
        move_value: { size: { width: '40px', height: '40px' }, position: { left: '358px', top: '70px' }, font: 'bangersregular', fontSize: 32, fontColor: 'white' },
        attack_value: { size: { width: '40px', height: '40px' }, position: { left: '412px', top: '70px' }, font: 'bangersregular', fontSize: 32, fontColor: 'white' },
        defend_value: { size: { width: '40px', height: '40px' }, position: { left: '466px', top: '70px' }, font: 'bangersregular', fontSize: 32, fontColor: 'white' },
        skill_value: { size: { width: '40px', height: '40px' }, position: { left: '522px', top: '70px' }, font: 'bangersregular', fontSize: 32, fontColor: 'white' },
        focus_value: { size: { width: '40px', height: '40px' }, position: { left: '574px', top: '70px' }, font: 'bangersregular', fontSize: 32, fontColor: 'white' },
        life_value: { size: { width: '40px', height: '40px' }, position: { left: '622px', top: '26px' }, font: 'bangersregular', fontSize: 32, fontColor: 'black' },
        awakening_value: { size: { width: '30px', height: '30px' }, position: { left: '644px', top: '66px' }, font: 'bangersregular', fontSize: 20, fontColor: 'white' }
    },
    BTAS: {
        theme_id: 2,
        template_name: 'BTAS',
        background_image: '/images/homebrew%20templates/BTAS/hero_background.png',
        overlay_image: '/images/homebrew%20templates/BTAS/hero_overlay.png',
        icon: { size: { width: '80px', height: '80px' }, position: { left: '10px', top: '15px' } },
        image: { size: { width: '350px', height: '454px' }, position: { left: '0px', top: '112px' } },
        name: { size: { width: '240px', height: '72px' }, position: { left: '100px', top: '0px' }, font: 'BebasNeueBold', fontSize: 58, fontColor: 'white', lineHeight: 0.84, 
            classList: 'transform scale-y-[140%] [text-shadow:_6px_6px_10px_rgb(0_0_0_/_80%)] ml-[-2px] tracking-[4px]' 
        },
        traits:  {size: { width: '240px', height: '40px' }, position: { left: '100px', top: '76px' }, font: 'BebasNeueLight', fontSize: 20, fontColor: 'white' },
        ability_container: { size: { width: '284px', height: '284px' }, position: { left: '370px', top: '162px' } },
        ability_name: { size: { width: '200px', height: '20px' }, position: { left: '100px', top: '200px' }, font: 'BebasNeueLight', fontSize: 32, fontColor: 'white',
            classList: ' w-[120%] ml-[-10%] transform !scale-x-[80%] tracking-[3px] !text-center mb-[1px] !bg-bottomline [background:_linear-gradient(to_right,_#77777700_5%,_#ffffff70_25%,_#ffffff70_75%,_#77777700_95%)_left_bottom_no-repeat]'
        },
        ability_effect: { size: { width: '190px', height: '20px' }, position: { left: '105px', top: '200px' }, font: 'DINCondensedLightRegular', fontSize: 19, fontColor: 'white',
            classList: '!text-left !leading-[calc(var(--fontSize)+1px)]'
        },
        action_dice: [
            { size: { width: '50px', height: '50px' }, position: { left: '342px', top: '490px' } },
            { size: { width: '50px', height: '50px' }, position: { left: '400px', top: '490px' } },
            { size: { width: '50px', height: '50px' }, position: { left: '458px', top: '490px' } },
            { size: { width: '50px', height: '50px' }, position: { left: '516px', top: '490px' } },
            { size: { width: '50px', height: '50px' }, position: { left: '574px', top: '490px' } },
            { size: { width: '50px', height: '50px' }, position: { left: '632px', top: '490px' } }
        ],
        move_value: { size: { width: '40px', height: '52px' }, position: { left: '353px', top: '88px' }, font: 'BebasNeueBold', fontSize: 52, fontColor: 'white' },
        attack_value: { size: { width: '40px', height: '52px' }, position: { left: '409px', top: '88px' }, font: 'BebasNeueBold', fontSize: 52, fontColor: 'white' },
        defend_value: { size: { width: '40px', height: '52px' }, position: { left: '463px', top: '88px' }, font: 'BebasNeueBold', fontSize: 52, fontColor: 'white' },
        skill_value: { size: { width: '40px', height: '52px' }, position: { left: '519px', top: '88px' }, font: 'BebasNeueBold', fontSize: 52, fontColor: 'white' },
        focus_value: { size: { width: '40px', height: '52px' }, position: { left: '573px', top: '88px' }, font: 'BebasNeueBold', fontSize: 52, fontColor: 'white' },
        life_value: { size: { width: '40px', height: '52px' }, position: { left: '629px', top: '38px' }, font: 'BebasNeueBold', fontSize: 32, fontColor: 'white' },
        awakening_value: { size: { width: '40px', height: '52px' }, position: { left: '629px', top: '94px' }, font: 'BebasNeueBold', fontSize: 32, fontColor: 'white' }
    },
}