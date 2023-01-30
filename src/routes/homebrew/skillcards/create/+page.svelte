<script lang="ts">
    import SkillCardEditor from '$lib/components/SkillCardEditor.svelte';
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<svelte:head><title>Create Your Hero - augs.tools</title></svelte:head>

<ol class="breadcrumb-nonresponsive">
<li class="crumb"><a href="/">Home</a></li>
<li class="crumb-separator" aria-hidden>&rsaquo;</li>
<li class="crumb"><a href="/create">Create</a></li>
<li class="crumb-separator" aria-hidden>&rsaquo;</li>
<li>Heroes</li>
</ol>

<SkillCardEditor></SkillCardEditor>