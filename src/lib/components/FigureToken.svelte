<script lang="ts">
    export let imageUrl: string;
</script>

<style>
    .figure-token {
        box-shadow: 0 0 0 4px green, 0 0 7px 4px black;
    }
</style>

<div class="figure-token w-20 h-20 ml-6 overflow-hidden bg-surface-200 rounded-full"><img src={imageUrl} alt="Hero Token"></div>