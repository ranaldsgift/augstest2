<script lang="ts">
    export let classList: string = '';
</script>

<style>
    .page-button-container {    
        position: relative;
        display: flex;
        gap: 5px;
        justify-content: center;
        top: 0px;
        right: 0px;
        z-index: 29;
    }
    @media (min-width: 750px) {
        .page-button-container {  
            position: fixed;
            top: 90px;
            right: 20px;
            z-index: 29;
            order: -1;
        }
    }
</style>
<div class="page-button-container {classList}">
    <slot></slot>
</div>