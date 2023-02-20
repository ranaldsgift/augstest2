<script lang="ts">
    import PigeonPeteSays from "$lib/components/PigeonPeteSays.svelte";
    import type { PageData } from './$types';
    export let data: PageData;
</script>

<div class="flex justify-center">
<PigeonPeteSays>
    <h1 class="text-warning-700-200-token text-2xl unstyled">For Pete's Sake!</h1>
    <p>Please <a href={`/user/${data.userId}/edit`}>create</a> your User Profile. You need a valid username to create homebrew content!</p>
</PigeonPeteSays>
</div>