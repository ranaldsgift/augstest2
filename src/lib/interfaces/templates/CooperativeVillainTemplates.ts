import type { PositionedTemplateContainer, PositionedTemplateText, Size, TemplateText } from "./HtmlTemplates";
import type { ThemeTemplatesEnum } from "./ThemeTemplatesEnum";

export interface CooperativeVillainTemplate {
    background_image: string
    overlay_image?: string
    backBackgroundImage: string
    targetPriorityArrow: string
    ability_container: PositionedTemplateContainer
    ability_name: TemplateText
    ability_effect: TemplateText
    targetPriorityContainer: PositionedTemplateContainer
    targetAttributeContainer: PositionedTemplateContainer
    optimalStrikeRangeContainer: PositionedTemplateContainer
    meleeStrikeRangeContainer: Size
    optimalStrikeRangeText: TemplateText
    attributes: {
        move: TemplateText
        moveContainer: PositionedTemplateContainer
        hits: TemplateText
        hitsContainer: PositionedTemplateContainer
        blocks: TemplateText
        blocksContainer: PositionedTemplateContainer
        life: TemplateText
        lifeContainer: PositionedTemplateContainer
    }
}

export const CooperativeVillainTemplates: Record<ThemeTemplatesEnum, CooperativeVillainTemplate> = {
    TMNT: {
        background_image: '/images/homebrew%20templates/TMNT/villain_cooperative_background.png',
        backBackgroundImage: '/images/homebrew%20templates/TMNT/villain_cooperative_back_background.png',
        ability_container: { size: { width: '296px', height: '300px' }, position: { left: '395px', top: '144px' } },
        targetPriorityArrow: '/images/homebrew%20templates/TMNT/villain_target_priority_arrow.png',
        ability_name: { font: 'bangersregular', fontSize: 32, fontColor: 'black',
            classList: '!text-center skew-x-[1deg] skew-y-[-1deg]'
        },
        ability_effect: { font: 'smackattack_bbregular', fontSize: 16, fontColor: 'black',
            classList: '!text-center skew-x-[1deg] skew-y-[-1deg]'
        },
        targetPriorityContainer: { size: { width: '40px', height: '28px' }, position: { left: '565px', top: '474px' } },
        targetAttributeContainer: { size: { width: '45px', height: '45px' }, position: { left: '600px', top: '466px' }, classList: 'bg-black rounded-full border-[1px] border-white' },
        optimalStrikeRangeContainer: { size: { width: '112px', height: '78px' }, position: { left: '376px', top: '486px' }, classList: '!overflow-visible justify-center text-center items-center' },
        optimalStrikeRangeText: { font: 'bangersregular', fontSize: 52, fontColor: 'white', classList: 'skew-x-[1.7deg] skew-y-[-1.7deg] text-outline' },
        meleeStrikeRangeContainer: { width: '55px', height: '55px' },
        attributes: {
            move: { font: 'bangersregular', fontSize: 32, fontColor: 'white', classList: 'text-outline skew-x-[1.7deg] skew-y-[-1.7deg]' },
            moveContainer: { size: { width: '40px', height: '40px' }, position: { left: '368px', top: '68px' }, classList: 'grid justify-center text-center' },
            hits: { font: 'bangersregular', fontSize: 32, fontColor: 'white', classList: 'text-outline skew-x-[1.7deg] skew-y-[-1.7deg]' },
            hitsContainer: { size: { width: '40px', height: '40px' }, position: { left: '448px', top: '68px' }, classList: 'grid justify-center text-center' },
            blocks: { font: 'bangersregular', fontSize: 32, fontColor: 'white', classList: 'text-outline skew-x-[1.7deg] skew-y-[-1.7deg]' },
            blocksContainer: { size: { width: '40px', height: '40px' }, position: { left: '535px', top: '68px' }, classList: 'grid justify-center text-center' },
            life: { font: 'bangersregular', fontSize: 32, fontColor: 'black', classList: 'skew-x-[1.7deg] skew-y-[-1.7deg]' },
            lifeContainer: { size: { width: '40px', height: '40px' }, position: { left: '620px', top: '36px' }, classList: 'grid justify-center text-center' },
        }
    },
    BTAS: {
        background_image: '/images/homebrew%20templates/BTAS/villain_cooperative_background.png',
        overlay_image: '/images/homebrew%20templates/BTAS/villain_cooperative_overlay.png',
        backBackgroundImage: '/images/homebrew%20templates/BTAS/villain_cooperative_back_background.png',
        targetPriorityArrow: '/images/homebrew%20templates/BTAS/villain_target_priority_arrow.png',
        ability_container: { size: { width: '284px', height: '284px' }, position: { left: '370px', top: '162px' }, classList: 'z-[3]' },
        ability_name: { font: 'BebasNeueLight', fontSize: 30, fontColor: 'black',
            classList: 'w-[130%] ml-[-15%] transform !scale-x-[70%] tracking-[calc(4px*var(--scale))] !text-center mb-[1px] !bg-bottomline [background:_linear-gradient(to_right,_#77777700_5%,_#ffffff70_25%,_#ffffff70_75%,_#77777700_95%)_left_bottom_no-repeat]'
        },
        ability_effect: { font: 'DINCondensedLightRegular', fontSize: 20, fontColor: 'black',
            classList: '!text-left !leading-[calc(calc(var(--fontSize)+calc(1px*var(--scale)))*var(--scale))] !px-[1px]'
        },
        targetPriorityContainer: { size: { width: '40px', height: '36px' }, position: { left: '505px', top: '490px' }, classList: 'z-[3]' },
        targetAttributeContainer: { size: { width: '30px', height: '30px' }, position: { left: '535px', top: '494px' }, classList: 'z-[3]' },
        optimalStrikeRangeContainer: { size: { width: '128px', height: '68px' }, position: { left: '404px', top: '487px' }, classList: 'z-[3] !overflow-visible items-center' },
        optimalStrikeRangeText: { font: 'BebasNeueBold', fontSize: 52, fontColor: 'white', classList: 'text-outline', strokeColor: '#231f20' },
        meleeStrikeRangeContainer: { width: '45px', height: '45px' },
        attributes: {
            move: { font: 'BebasNeueBold', fontSize: 52, fontColor: 'white', classList: 'text-outline', strokeColor: '#231f20' },
            moveContainer: { size: { width: '44px', height: '52px' }, position: { left: '367px', top: '88px' }, classList: 'text-center' },
            hits: { font: 'BebasNeueBold', fontSize: 52, fontColor: 'white', classList: 'text-outline', strokeColor: '#231f20' },
            hitsContainer: { size: { width: '44px', height: '52px' }, position: { left: '449px', top: '88px' }, classList: 'text-center' },
            blocks: { font: 'BebasNeueBold', fontSize: 52, fontColor: 'white', classList: 'text-outline', strokeColor: '#231f20' },
            blocksContainer: { size: { width: '44px', height: '52px' }, position: { left: '531px', top: '88px' }, classList: 'text-center' },
            life: { font: 'BebasNeueBold', fontSize: 52, fontColor: 'white', classList: 'text-outline', strokeColor: '#231f20' },
            lifeContainer: { size: { width: '44px', height: '52px' }, position: { left: '613px', top: '88px' }, classList: 'text-center' },
        }
    },
}