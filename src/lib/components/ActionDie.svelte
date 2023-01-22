<script lang="ts">
    import type { DiceIconsEnum } from "$lib/enums/Enums";
    import type { ThemeTemplatesEnum } from "$lib/interfaces/templates/ThemeTemplatesEnum";
    import ActionDiceIcon from "./ActionDiceIcon.svelte";

    export let faces: [DiceIconsEnum, DiceIconsEnum, DiceIconsEnum, DiceIconsEnum, DiceIconsEnum, DiceIconsEnum];
    export let backgroundColor: string = "#000000";
    export let iconColor: string = "#000000";
    export let theme: ThemeTemplatesEnum;

</script>
<style>
    

.dice {
    position: relative;
    width: 60px;
    height: 60px;
    transform-style: preserve-3d;
    transform: rotateY(0deg) rotateX(60deg) rotateZ(315deg);
}
.dice:hover {
    animation-play-state: running;
}
.side {
    width: 100%;
    height: 100%;
    border: 1px solid var(--iconColor);
    position: absolute;
    opacity: 1.0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border-radius: 10px;
    background: var(--backgroundColor);
}
.one {
    transform: translateZ(30px);
}
.two {
    transform: translateX(-30px) rotateY(-90deg);
}
.three {
    transform: translateY(30px) rotateX(90deg);
}
.four {
    transform: translateY(-30px) rotateX(90deg);
}
.five {
    transform: translateX(30px) rotateY(90deg);
}
.six {
    transform: translateZ(-30px);
}
</style>


<div class="dice z-20" style:--backgroundColor={backgroundColor} style:--iconColor={iconColor}>
    <div class="side one"><ActionDiceIcon icon={faces[0]} theme={theme} color={iconColor}></ActionDiceIcon></div>
    <div class="side two"><ActionDiceIcon icon={faces[1]} theme={theme} color={iconColor}></ActionDiceIcon></div>
    <div class="side three"><ActionDiceIcon icon={faces[2]} theme={theme} color={iconColor}></ActionDiceIcon></div>
    <div class="side four"><ActionDiceIcon icon={faces[3]} theme={theme} color={iconColor}></ActionDiceIcon></div>
    <div class="side five"><ActionDiceIcon icon={faces[4]} theme={theme} color={iconColor}></ActionDiceIcon></div>
    <div class="side six"><ActionDiceIcon icon={faces[5]} theme={theme} color={iconColor}></ActionDiceIcon></div>
</div>  