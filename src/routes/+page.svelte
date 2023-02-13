<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy, onMount } from 'svelte';
	import type { JokeModel } from '$lib/logic/JokeModel';
	import type { PageData } from './$types';
	import JokeCard from './JokeCard.svelte';
	export let data: PageData;
	let observer: IntersectionObserver;
	let footer: Element;

	onMount(async () => {
		if (browser) {
			const handleIntersect = (
				entries: IntersectionObserverEntry[],
				observer: IntersectionObserver
			) => {
				entries.forEach(async (entry: any) => {
					if (entry.isIntersecting) {
						const moreJokesReq = await fetch('api/more-jokes');
						if (moreJokesReq.ok) {
							const newJokes: { jokes: JokeModel[] } = await moreJokesReq.json();
							data = { jokes: data.jokes.concat(newJokes.jokes) };
						}
					}
				});
			};
			const options: IntersectionObserverInit = { threshold: 0.5, rootMargin: '-100% 0% 100%' };
			observer = new IntersectionObserver(handleIntersect, options);
			observer.observe(footer);
		}
	});
	onDestroy(() => observer ? observer.disconnect() :null);
</script>

<a href="/my-jokes">Bookmarked Jokes</a>
<h1>Joker</h1>
<main>
	<div class="column">
		{#if data.jokes.length == 0}
			<h2>No jokes found, that is odd...</h2>
			<p>Please enjoy a cat in the meantime</p>
			<img src="https://httpcats.com/500.jpg" alt="A cat biting in a cabel" />
		{/if}
		{#each data.jokes as joke}
			<JokeCard {joke} />
		{/each}
	</div>
</main>

<footer bind:this={footer}>
	<small>Flajt 2023, All Rights Reserved</small>
</footer>

<style>
    a{  
        margin: 8px;
        display: inline-flex;
        justify-content: end;
        width: 99%;
        height: 1rem;
    }
	h1 {
		width: 100%;
		text-align: center;
	}
	.column {
		display: grid;
		justify-content: center;
		align-content: center;
	}
</style>
