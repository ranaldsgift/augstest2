<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<ol class={data.breadcrumbClass}>
    <li class="crumb"><a href="/">Home</a></li>
    <li class="crumb-separator" aria-hidden>&rsaquo;</li>
    <li>Support</li>
</ol>

<h1>Support</h1>