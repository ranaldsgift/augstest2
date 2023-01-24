<script>
    import ComicButton from "$lib/components/ComicButton.svelte";

</script>

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

<svelte:head><title>About - augs.tools</title></svelte:head>

<ol class="breadcrumb-nonresponsive">
	<li class="crumb"><a href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">About</li>
</ol>

<div class="about-page max-w-5xl grid">
	<header class="comic-header">
		<h1>About</h1>
	</header>
	<div class="comic-body">
		<h1 class="unstyled">How It Started</h1>
		<hr>
		<p>
			This project began in 2021 when I fell in love with and got addicted to <a href="https://boardgamegeek.com/boardgame/263192/teenage-mutant-ninja-turtles-adventures-change-con">TMNT AUGS</a>. It didn't take long to stumble across the <a href="https://www.facebook.com/groups/TMNTShadowsOfThePast">AUGS Facebook group</a> created by <a href="https://boardgamegeek.com/boardgamedesigner/110862/pete-walsh">Pete Walsh</a>, and the community <a href="https://discord.gg/nU6wSXU3bn">Discord</a>.
		</p>
		<p>
			Everyone in the community was so passionate and excited about the game system -- all the toys we had to play with. People were sharing their ideas for custom content. Some people were posting images of their new custom characters, others were designing elaborate scenarios to playthrough. You can find a lot of this custom content by digging through the Facebook page.
		</p>
		<p>
			It's full of amazing ideas, but it's a bit cumbersome to sift through it all on Facebook. I wanted something a little better. The creativity and the supportive nature of the community inspired me to create a place where we could all create and share our...creations!
		</p>
		<h1 class="unstyled">Baby Steps</h1>
		<hr>
		<p>
			The <a href="https://github.com/ranaldsgift/tmntaugs">first iteration</a> was back in December 2021 when really all I wanted to build was a way to play the AUGS games we love using the event deck that was designed and planned for the Mutanimals expansion. I wanted it to take care of some admin work, similar to the way <a href="http://en.esotericsoftware.com/gloomhaven-helper">Gloomhaven Helper</a> streamlines the process of managing the AI and the game in general.
		</p>
		<p>
			While building this tool, I thought it would be interesting to try creating tools that we could use to create homebrew AUGS content. I added pages to the original website for users to create their own TMNT styled Hero and Villain Sheets, and Skill Cards. This was before <a href="https://boardgamegeek.com/boardgame/299566/batman-animated-series-adventures-shadow-bat">BTAS Shadow of the Bat</a> had released, so all of this content was TMNT only. Nothing was stored in a database, but it did generate PNG images for the content that was created.
		</p>
		<h1 class="unstyled">Cooking with Gas</h1>
		<hr>
		<p>
			Since then I always wanted to build a more robust tool to create and share AUGS content. I have some experience building community oriented websites like this, having built <a href="https://www.ranalds.gift/">ranalds.gift</a> for the Vermintide community. I had some lofty goals about the future of that project on release, but working with the technologies that I had used at the time was detrimental and they make me more reluctant to return to it without a major code re-write.
		</p>
		<p>
			At the time, it was my first <a href="https://reactjs.org/">React</a> project and I was using <a href="https://firebase.google.com/">Firebase</a> for my database backend. Without getting into too many details, I've abandonned both of those for this project and I'm now using <a href="https://kit.svelte.dev/">Sveltekit</a> and <a href="https://supabase.com/">Supabase</a>.
		</p>
		<p>
			I only discovered Sveltekit in December 2022, but I'm so happy I did. Using these tools really improves development and helps produce a more performant and feature rich product. The scale of this project is much larger than my previous one, but I feel confident that with the support of the community, we'll be able to build something awesome that we can all use to create more content for the community!
		</p>
	</div>
</div>


