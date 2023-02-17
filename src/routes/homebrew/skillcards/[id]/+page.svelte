<script lang="ts">
    import SkillCardEditor from '$lib/components/SkillCardEditor.svelte';
    import { SkillCard } from '$lib/entities/SkillCard';
    import { User } from '$lib/entities/User';
    import { DataHelper } from '$lib/helpers/DataHelper';
    import { DateHelper } from '$lib/helpers/DateHelper';
    import { SkillCardTemplates } from '$lib/interfaces/templates/SkillCardTemplate';
    import type { PageData } from './$types';
    
    export let data: PageData;

    const skillCard = DataHelper.deserialize<SkillCard>(SkillCard, data.skillCardJSON);

    const skillCardTheme = skillCard.hero ? skillCard.hero.theme : skillCard.theme;
    const skillCardBackgroundColor = skillCard.hero ? skillCard.hero.sheetBackgroundColor : skillCard.backgroundColor;
    const skillCardTemplate = SkillCardTemplates[skillCardTheme];

    let authUser = data.authUser ? DataHelper.deserialize<User>(User, data.authUser) : null;
</script>

<svelte:head><title>{skillCard.name} by {skillCard.user.userName} - Skill Card - augs.tools</title></svelte:head>

<ol class="breadcrumb-nonresponsive">
	<li class="crumb"><a href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb"><a href="/homebrew">Homebrew</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb"><a href="/homebrew/skillcards">Skill Cards</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">{skillCard.name}</li>
</ol>

<div class="skill-card-page h-full">
    <div class="flex h-full justify-center gap-5 mt-5">
        <div class="read-only">
            <SkillCardEditor scale={1} skillCard={skillCard}></SkillCardEditor>
        </div>
        <div class="homebrew-details-container flex flex-col sm:flex-row lg:flex-col gap-5 pb-5">                
            <div class="comic-label">
                <h1>Designer</h1>
                <p><a href="/user/{skillCard.user.id}">{skillCard.user.userName}</a></p>
            </div>
            <div class="comic-label">
                <h1>Created</h1>
                <p>{new Date(skillCard.dateCreated).toLocaleDateString()}</p>
            </div>
            {#if skillCard.dateCreated != skillCard.dateModified}
            <div class="comic-label">
                <h1>Updated</h1>
                <p>{DateHelper.timeSinceString(new Date(skillCard.dateModified), new Date())}</p>
            </div>
            {/if}
        </div>
    </div>
</div>