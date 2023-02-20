<script>
    import { page } from '$app/stores';
    import PigeonPeteSays from '$lib/components/PigeonPeteSays.svelte';
</script>
  
<svelte:head><title>For Pete's Sake! - augs.tools</title></svelte:head>

<div class="h-full w-full grid">
    <PigeonPeteSays>
        <h2 class="!text-warning-700-200-token text-2xl">For Pete's Sake!</h2>
        <p>{$page.status} - {$page.error?.message}</p>
    </PigeonPeteSays>
</div>