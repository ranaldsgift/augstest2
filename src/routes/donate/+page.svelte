<script>
    import ComicButton from "$lib/components/ComicButton.svelte";

</script>
<ol class="breadcrumb-nonresponsive">
	<li class="crumb"><a href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">Donate</li>
</ol>

<style>
	.comic-body p {
		line-height: 2rem;
		margin-bottom: 1rem;
		font-family: monospace;
	}
	h1 {
		text-align: center;
		color: rgba(var(--color-tertiary-700));
	}
</style>

<div class="about-page max-w-5xl grid">
	<header class="comic-header">
		<h1>Donate</h1>
	</header>
	<div class="comic-body">
		
		<h1>Why Should I Donate?</h1>
		<hr>
		<p>
			Listen, I don't want to charge anyone to use this website. I don't want to put any ads on here. But that doesn't mean there are no costs to building something like this. I do try to make it a point to ensure that I don't incur any significant recurring costs, because I'm just not in the position to do so, especially for a projec that I'm building for free. For the most part, my only real expense is domain registration, and that isn't so expensive.
		</p>
		<h1>OK...</h1>
		<hr>
		<p>
			Time also costs money, and it does take time to develop this website. Time is a premium to all of us. Time I spend developing this website is time that I can't be playing AUGS games. Ultimately, I work on this project because I love the community and I want to give back, and it's something I enjoy doing. I'll be continuing to work on this website, I won't tell you that future development depends on donations because it does not.
		</p>
		<p>
			But if you do enjoy this website, and you want to see it continue to grow, please consider donating. I sincerely appreciate everyone who visits this website, and if you are just reading this right now, I'm so happy to have reached you.
		</p>
		<p>
			The one thing that I will ask is to spread the word. Spread the love for this wonderful game system that continues to inspire us.
		</p>
		<div class="flex justify-center">
			<ComicButton text="Donate" icon="mdi:donate"></ComicButton>
		</div>
	</div>
	<div class="page-button-container">
	</div>
</div>


