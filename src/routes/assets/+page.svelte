<script>
    const pdfs = Object.keys(import.meta.glob("/static/assets/*.pdf"));
</script>

<ol class="breadcrumb-nonresponsive">
	<li class="crumb"><a href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">Assets</li>
</ol>

<div class="comic-form max-w-5xl grid gap-5">
    <header>
        <h1>Assets</h1>
    </header>
    <p>Below you can find a list of different assets available for download.</p>
    <p>If you'd like to contribute to this list, please contact me on Discord or make a pull request on GitHub.</p>
    <header>
        <h1>PDFs</h1>
    </header>
    <ul>
        {#each pdfs as pdf}
        <li class="py-2">
            <a href={`https://github.com/ranaldsgift/augstools/raw/main${pdf}`}>{pdf.substring(pdf.lastIndexOf("/") + 1).replace('.pdf','')}</a>
        </li>
        {/each}
    </ul>
</div>