<script>
    const pdfs = Object.keys(import.meta.glob("/static/assets/*.pdf"));
    const btasPdfs = pdfs.filter(pdf => pdf.toLocaleLowerCase().includes("btas"));
    const tmntPdfs = pdfs.filter(pdf => pdf.toLocaleLowerCase().includes("tmnt"));
</script>

<svelte:head><title>Assets - augs.tools</title></svelte:head>

<ol class="breadcrumb-nonresponsive">
	<li class="crumb"><a href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">Assets</li>
</ol>

<div class="comic-form max-w-7xl grid gap-5">
    <div>
        <header>
            <h1>Assets</h1>
        </header>
        <div class="comic-body">
            <p>Below you can find a list of different assets available for download.</p>
            <p>If you'd like to contribute to this list, please contact me on Discord or make a pull request on GitHub.</p>
        </div>
    </div>
    <div>
        <header>
            <h1>TMNT</h1>
        </header>
        <ul class="comic-body mb-5">
            {#each tmntPdfs as pdf}
            <li class="py-2 flex gap-2">
                <iconify-icon icon="ph:file-pdf-fill" class=""></iconify-icon>
                <a href={`https://github.com/ranaldsgift/augstools/raw/main${pdf}`}>{pdf.substring(pdf.lastIndexOf("/") + 1).replace('.pdf','')}</a>
            </li>
            {/each}
        </ul>
        <header>
            <h1>BTAS</h1>
        </header>
        <ul class="comic-body">
            {#each btasPdfs as pdf}
            <li class="py-2 flex gap-2">
                <iconify-icon icon="ph:file-pdf-fill" class=""></iconify-icon>
                <a href={`https://github.com/ranaldsgift/augstools/raw/main${pdf}`}>{pdf.substring(pdf.lastIndexOf("/") + 1).replace('.pdf','')}</a>
            </li>
            {/each}
        </ul>
    </div>
</div>