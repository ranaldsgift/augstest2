<script lang="ts">
    import PigeonPeteSays from "$lib/components/PigeonPeteSays.svelte";
    import { drawerStore } from "@skeletonlabs/skeleton";
</script>

<div class="flex justify-center">
<PigeonPeteSays>
    <h1 class="text-warning-700-200-token text-2xl unstyled">For Pete's Sake!</h1>
    <p>Please <button class="text-primary-600 unstyled" on:click={() => drawerStore.open({ id: 'login', position: 'left' })}>login</button> and then try again!</p>
</PigeonPeteSays>
</div>