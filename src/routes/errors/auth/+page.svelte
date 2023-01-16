<script lang="ts">
    import PigeonPeteSays from "$lib/components/PigeonPeteSays.svelte";
    import { drawerStore } from "@skeletonlabs/skeleton";
</script>

<div class="flex justify-center">
<PigeonPeteSays>
    <h1 class="text-warning-800 text-2xl unstyled">For Pete's Sake!</h1>
    <p>Please <button class="text-primary-600 unstyled" on:click={() => drawerStore.open({ position: 'left' })}>login</button> and then try again!</p>
</PigeonPeteSays>
</div>