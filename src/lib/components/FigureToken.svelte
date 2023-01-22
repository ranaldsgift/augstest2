<script lang="ts">
    export let imageUrl: string;
</script>

<style>
    .figure-token {
        box-shadow: 0 0 3px 1px black;
        border: 5px solid green;
    }
</style>
<div class="figure-token-container">
<div class="figure-token w-24 h-24 overflow-hidden bg-surface-200 rounded-full"><img src={imageUrl} alt="Hero Token"></div>
</div>