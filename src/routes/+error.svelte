<script>
    import { page } from '$app/stores';
    import PigeonPeteSays from '$lib/components/PigeonPeteSays.svelte';
</script>
  
<svelte:head><title>For Pete's Sake! - augs.tools</title></svelte:head>

<PigeonPeteSays>
    <h1 class="text-warning-800 unstyled text-2xl">{$page.status} - {$page.error?.message}</h1>
    <p>Oopsie doodle, try another poodle</p>
</PigeonPeteSays>