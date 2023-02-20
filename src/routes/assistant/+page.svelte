<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<svelte:head><title>AUGS Assistant - augs.tools</title></svelte:head>

<ol class={data.breadcrumbClass}>
	<li class="crumb"><a href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">AUGS Assistant</li>
</ol>

<div class="flex flex-col h-full" style:padding-bottom="0px">
    <header class="comic-header">
        <h1>AUGS Assistant</h1>
    </header>
    <iframe style:background="#008f61" src="https://tmntaugs.pages.dev/" title="AUGS Co-Op Tool" width="100%"  class="comic-body p-0 h-full -mt-4 mb-[72px]" style:border-bottom="4px solid black" style:border-right="4px solid black" style:border-left="4px solid black"></iframe>
</div>