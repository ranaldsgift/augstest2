<script lang="ts">
	export let parent: any;
	import { modalStore } from '@skeletonlabs/skeleton';
    import ComicButton from './ComicButton.svelte';

    export let fields: string;

    var parsedFields = JSON.parse(fields);

	// We've created a custom submit function to pass the response and close the modal.
	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(parsedFields);
		modalStore.close();
	}
</script>

<style>
    span {
        text-transform: capitalize;
    }
</style>

{#if parsedFields}
<div class="modal-example-form space-y-4">
	<form class="modal-form border border-surface-500 p-4 space-y-4 rounded-container-token" on:submit|preventDefault={onFormSubmit}>
        {#each parsedFields as field}
            <label>
                <span>{field.name.replace(/([a-z])([A-Z])/g, '$1 $2')}</span>
                {#if field.type == "number"}
                <input type="number" name={field.name} bind:value={field.value}/>
                {:else if field.type == "textarea"}
                <textarea name={field.name} bind:value={field.value} rows="5"></textarea>
                {:else}
                <input type="text" name={field.name} bind:value={field.value}/>
                {/if}
            </label>
        {/each}
        <slot name="form"></slot>
	</form>
	<footer class="modal-footer {parent.regionFooter}">
        <ComicButton text="Cancel" callback={parent.onClose}></ComicButton>
        <ComicButton text="Save" icon="material-symbols:save" callback={onFormSubmit}></ComicButton>
    </footer>
</div>
{/if}