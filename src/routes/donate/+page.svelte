<script lang="ts">
    import { goto } from "$app/navigation";
    import ComicButton from "$lib/components/ComicButton.svelte";
    import PageButtonContainer from "$lib/components/PageButtonContainer.svelte";
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<style>
	.comic-body p {
		line-height: 2rem;
		margin-bottom: 1rem;
	}
	h1 {
		text-align: center;
		color: rgba(var(--color-tertiary-700));
	}
	div>h1 {
		font-size: 1.875rem;
	}
</style>

<svelte:head><title>Donate - augs.tools</title></svelte:head>

<ol class={data.breadcrumbClass}>
	<li class="crumb"><a href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">Donate</li>
</ol>

<div class="about-page max-w-5xl grid">
	<PageButtonContainer>
		<ComicButton text="Donate" callback={() => goto(`https://www.paypal.com/donate/?hosted_button_id=MYJ9RA3FJAZQ6`)} icon="mdi:donate"></ComicButton>
	</PageButtonContainer>
	<header class="comic-header">
		<h1>Donate</h1>
	</header>
	<div class="comic-body">			
		<h1>Why Should I Donate?</h1>
		<hr>
		<p>
			I don't want to charge anyone to use this website. I don't want to put any ads on here. The only ads you will ever see are the few curated ones listed below on this page. But the reality is that there <i>are</i> costs to building something like this. I do try to make it a point to ensure that I don't incur any significant recurring costs, because I'm just not in the position to do so, especially for a project that I'm building for free. For the most part, my only real expense is domain registration, and that isn't so expensive.
		</p>
		<p>
			For now (and probably forever), the website will be using images hosted elsewhere on the web. You'll notice there are no file uploads for images, instead users are prompted to provide a URL. This is done intentionally to reduce bandwidth, and in turn keep costs lower.
		</p>
		<h1>Alright so you have no real expenses?</h1>
		<hr>
		<p>
			Spending time is like spending money, and it does take time to develop this website. Time is a premium to all of us. Time I spend developing this website is time that I can't be playing AUGS games. Ultimately, I work on this project because I love the community and I want to give back, and it's something I enjoy doing. I'll be continuing to work on this website, when my schedule allows and I am sufficiently motivated. I won't tell you that future development depends on donations because it does not.
		</p>
		<p>
			I will say that I have spent a great amount of time and effort to create this tool, so if you do enjoy this website, and you want to see it continue to grow, please consider donating. I sincerely appreciate everyone who visits this website. It doesn't matter if you donate, if you come to create content, or if you are here just to consume that content. You are all important, and <a href="/">augs.tools</a> is designed with all of you in mind. If you have feedback or ideas, please let me know. If you are reading this right now, I'm so happy to have reached you.
		</p>
		<p>
			The one thing that I will ask is to spread the word. Spread the love for this wonderful game system that continues to inspire us.
		</p>
		<div class="flex justify-center">
			<ComicButton text="Donate" icon="mdi:donate"></ComicButton>
		</div>
		<p class="pt-4">Check out the <a href="http://localhost:5173/about">about page</a> if you want to learn more about the creation and development of this website.</p>
		<p>
			Also I will eventually add a section that lists all the supporters if they wish to be listed. Supporters would also receive a custom profile badge, similar to the Founder badge for people who created accounts during the early stages of development and had to endure any issues related to that journey.
		</p>
	</div>
	<div class="pt-6">
		<header class="comic-header">
			<h1>Featured</h1>
		</header>		
		<div class="comic-body">
		<p>This <a href="https://minipott.com/">etsy shop</a> is owned and operated by my girlfriend and fellow AUGS fanatic, Minipott. She creates handmade pottery and has a lovely shop filled with beautiful items. Check it out!</p>
		<a href="https://minipott.com/"><img class="shadow-xl" src="https://i.etsystatic.com/isbl/6c93d9/36441098/isbl_3360x840.36441098_dstjxy2g.jpg" alt="Minipott's Store"></a>
		<p class="pt-4">This <a href="https://boardgamegoodies.shop/">shop</a> is owned and operated by another AUGS addict, @Rynohardt, who you can catch in the AUGS discord. They have amazing game upgrades on offer for your AUGS games and more!</p>
		<a href="https://boardgamegoodies.shop/">
			<div class="grid justify-center gap-2 grid-flow-col">
				<img class="h-full" src="https://cdn.shopify.com/s/files/1/0662/9575/9078/products/CarsCiC01.jpg" alt="Board Game Goodies Shop - TMNT Scene">
				<img class="h-full" src="https://cdn.shopify.com/s/files/1/0662/9575/9078/products/Ready_IMG_56782.jpg?v=1667354122" alt="Board Game Goodies Shop - TMNT Scene">
				<img class="h-full" src="https://cdn.shopify.com/s/files/1/0662/9575/9078/products/Ready_IMG_5675.jpg?v=1667355278" alt="Board Game Goodies Shop - BTAS Scene">
			</div>
		</a>
		</div>
	</div>
</div>


