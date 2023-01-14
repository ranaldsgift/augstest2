<script lang="ts">
    import { page } from '$app/stores';
    import HeroSheet from '$lib/components/HeroEditorSheet.svelte';
    import ComicButton from '$lib/components/ComicButton.svelte';
    import { onMount } from 'svelte';
    import * as htmlToImage from 'html-to-image';
    import { Hero } from '$lib/entities/Hero';
    import ActionDiceIcon from '$lib/components/ActionDiceIcon.svelte';
    import type { PageData } from './$types';
    import { DataHelper } from '$lib/helpers/DataHelper';

    export let data: PageData;

    const hero = DataHelper.deserialize<Hero>(Hero, data.heroModel);

    let heroSheet: HTMLElement;
    let heroSheetImage: HTMLElement;

    onMount(() => {
        var heroSheetContainer = heroSheet.querySelector('.hero-sheet-container') as HTMLElement;

        htmlToImage.toCanvas(heroSheetContainer, { style: { borderRadius: "0px" } })
        .then(function (canvas) {
            heroSheetImage.appendChild(canvas); 
            heroSheetImage.style.display = 'block';
            heroSheet.remove();
        });
    });
</script>

<style>
    .comic-form {
        min-width: 300px;
    }
    .hero-page :global(.hero-sheet-container) {
        pointer-events: none;
    }
    .hero-page {
        max-width: 1566px;
    }

.dice {
  position: relative;
  width: 100px;
  height: 100px;
 transform-style: preserve-3d;
  transform: rotateY(0deg) rotateX(60deg) rotateZ(315deg);
  animation: rotate 5s linear infinite;
  animation-play-state: paused;
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
  padding: 15px;
  border-radius: 15px;
  background: var(--backgroundColor);
}

.base {
  width: 100%;
  height: 100%;
  transform: translateY(73px) rotateX(90deg);
    border: 0;
    background: blue;
}
.one {
    transform: translateZ(50px);
}
.two {
    transform: translateX(-50px) rotateY(-90deg);
}
.three {
    transform: translateY(50px) rotateX(90deg);
}
.four {
    transform: translateY(-50px) rotateX(90deg);
}
.five {
    transform: translateX(50px) rotateY(90deg);
}
.six {
    transform: translateZ(-50px);
}

@keyframes rotate {
  from {
    transform: rotateY(0deg) rotateX(60deg) rotateZ(315deg);
  }
  to {
    transform: rotateY(360deg) rotateX(60deg) rotateZ(315deg);
  }
}

</style>

<svelte:head><title>Create Your Homebrew</title></svelte:head>

<ol class="breadcrumb-nonresponsive">
	<li class="crumb"><a href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb"><a href="/homebrew">Homebrew</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb"><a href="/homebrew/heroes">Heroes</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">{hero?.name}</li>
</ol>

<div class="hero-page flex justify-center gap-5 flex-wrap">    
    {#if !hero}
        <p>There is no data available for this Homebrew.</p>
    {:else}
        <div bind:this={heroSheet}>
            <HeroSheet hero={hero}></HeroSheet>
        </div>
        <div style:box-shadow="black 0 0 3px 1px" style:border-radius="5px" style:display="none" bind:this={heroSheetImage}></div>
        <div class="comic-form grow">
            <div class="flex grow gap-5 pb-5">                
                <div class="comic-label">
                    <h1>Designer</h1>
                    <p><a href="/user/{hero.user.id}">{hero.user.userName}</a></p>
                </div>
                <div class="comic-label">
                    <h1>Date Created</h1>
                    <p>{new Date(hero.dateCreated).toLocaleDateString()}</p>
                </div>
                {#if hero.dateCreated != hero.dateModified}
                <div class="comic-label">
                    <h1>Date Updated</h1>
                    <p>{new Date(hero.dateModified).toLocaleDateString()}</p>
                </div>
                {/if}
            </div>
            {#if hero.description}
            <div class="flex gap-5 pb-5">   
                <div class="comic-label">
                    <h1>Hero Description</h1>
                    <p>{hero.description}</p>
                </div>
            </div>
            {/if}
    
            {#if $page.data.session && $page.data.session.user.id == hero.user.id}
            <div class="flex justify-center">
                <a href={$page.url + "/edit"} class="unstyled">
                    <ComicButton icon="mdi:edit" text="Edit Your Build"></ComicButton>
                </a>
            </div>
            {/if}
            <div class="flex gap-20 p-10 justify-center">
                <div class="dice z-20" style:--backgroundColor={hero.actionDice.backgroundColor} style:--iconColor={hero.actionDice.iconColor}>
                    <div class="side one"><ActionDiceIcon icon={hero.actionDice.dice[0]} theme={hero.theme} color={hero.actionDice.iconColor}></ActionDiceIcon></div>
                    <div class="side two"><ActionDiceIcon icon={hero.actionDice.dice[1]} theme={hero.theme} color={hero.actionDice.iconColor}></ActionDiceIcon></div>
                    <div class="side three"><ActionDiceIcon icon={hero.actionDice.dice[2]} theme={hero.theme} color={hero.actionDice.iconColor}></ActionDiceIcon></div>
                    <div class="side four"><ActionDiceIcon icon={hero.actionDice.dice[3]} theme={hero.theme} color={hero.actionDice.iconColor}></ActionDiceIcon></div>
                    <div class="side five"><ActionDiceIcon icon={hero.actionDice.dice[4]} theme={hero.theme} color={hero.actionDice.iconColor}></ActionDiceIcon></div>
                    <div class="side six"><ActionDiceIcon icon={hero.actionDice.dice[5]} theme={hero.theme} color={hero.actionDice.iconColor}></ActionDiceIcon></div>
                  </div>
                  <div class="dice z-10" style:--backgroundColor={hero.actionDice.backgroundColor} style:--iconColor={hero.actionDice.iconColor}>
                      <div class="side one"><ActionDiceIcon icon={hero.actionDice.dice[0]} theme={hero.theme} color={hero.actionDice.iconColor}></ActionDiceIcon></div>
                      <div class="side two"><ActionDiceIcon icon={hero.actionDice.dice[1]} theme={hero.theme} color={hero.actionDice.iconColor}></ActionDiceIcon></div>
                      <div class="side three"><ActionDiceIcon icon={hero.actionDice.dice[2]} theme={hero.theme} color={hero.actionDice.iconColor}></ActionDiceIcon></div>
                      <div class="side four"><ActionDiceIcon icon={hero.actionDice.dice[3]} theme={hero.theme} color={hero.actionDice.iconColor}></ActionDiceIcon></div>
                      <div class="side five"><ActionDiceIcon icon={hero.actionDice.dice[4]} theme={hero.theme} color={hero.actionDice.iconColor}></ActionDiceIcon></div>
                      <div class="side six"><ActionDiceIcon icon={hero.actionDice.dice[5]} theme={hero.theme} color={hero.actionDice.iconColor}></ActionDiceIcon></div>
                    </div>
                    <div class="dice" style:--backgroundColor={hero.actionDice.backgroundColor} style:--iconColor={hero.actionDice.iconColor}>
                        <div class="side one"><ActionDiceIcon icon={hero.actionDice.dice[0]} theme={hero.theme} color={hero.actionDice.iconColor}></ActionDiceIcon></div>
                        <div class="side two"><ActionDiceIcon icon={hero.actionDice.dice[1]} theme={hero.theme} color={hero.actionDice.iconColor}></ActionDiceIcon></div>
                        <div class="side three"><ActionDiceIcon icon={hero.actionDice.dice[2]} theme={hero.theme} color={hero.actionDice.iconColor}></ActionDiceIcon></div>
                        <div class="side four"><ActionDiceIcon icon={hero.actionDice.dice[3]} theme={hero.theme} color={hero.actionDice.iconColor}></ActionDiceIcon></div>
                        <div class="side five"><ActionDiceIcon icon={hero.actionDice.dice[4]} theme={hero.theme} color={hero.actionDice.iconColor}></ActionDiceIcon></div>
                        <div class="side six"><ActionDiceIcon icon={hero.actionDice.dice[5]} theme={hero.theme} color={hero.actionDice.iconColor}></ActionDiceIcon></div>
                      </div>
            </div>
        </div>
    {/if}
</div>