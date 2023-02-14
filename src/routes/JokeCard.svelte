<script lang="ts">
	import { JokeType, type JokeModel } from '$lib/logic/JokeModel';
	import { myJokesStore } from '$lib/stores/myJokesStore';
	export let joke: JokeModel;

	async function handleBookMark() {
		joke.hasBookmarked = !joke.hasBookmarked;
		if (joke.hasBookmarked == true) {
			const resp = await fetch('/api/bookmark', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({ id: joke.id })
			});
			if (!resp.ok) {
				alert('Please log in to bookmark jokes');
				joke.hasBookmarked = !joke.hasBookmarked;
			}
		} else {
			const resp = await fetch('/api/bookmark', {
				method: 'DELETE',
				credentials: 'include',
				body: JSON.stringify({ id: joke.id })
			});
			if (resp.ok) {
				myJokesStore.update((v) => v.filter((v) => v.id !== joke.id));
			} else {
				joke.hasBookmarked = !joke.hasBookmarked;
			}
		}
	}
</script>

<div class="jokeCard">
	{#if joke.type == JokeType.single}
		<p id="body">{joke.joke}</p>
	{:else}
		<h2>{joke.setup}</h2>
		<p id="setup">{joke.setup}</p>
		<p id="delivery">{joke.delivery}</p>
	{/if}
	<div id="btn-wrapper">
		<button
			on:click={async () => {
				await handleBookMark();
			}}
			data-cy="bookmark"
			id="bookmark-btn"
		>
			<img
				data-cy={joke.hasBookmarked}
				src={!joke.hasBookmarked ? './bookmark-white.png' : './bookmark.png'}
				alt={!joke.hasBookmarked ? 'Unbookmark button' : 'Bookmark button'}
				sizes="10"
			/>
		</button>
	</div>
</div>

<style>
	* {
		box-sizing: border-box;
	}

	.jokeCard {
		border-radius: 8px;
		border: 2px solid black;
		width: 30vw;
		height: 38vh;
		padding: 8px;
		margin: 8px;
		box-shadow: 2px 2px 16px 2px grey;
		max-height: 350px;
		min-height: 200px;
	}
	h2 {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		max-width: 28vw;
		margin-bottom: 6vh;
	}
	#setup {
		font-size: 18;
	}
	#delivery {
		font-style: italic;
	}
	#body {
		display: grid;
		justify-content: center;
		align-content: center;
		height: 20vh;
		margin-bottom: 0px;
	}
	img {
		width: 30px;
		height: 35px;
	}

	#btn-wrapper {
		display: inline-flex;
		justify-content: end;
		width: 100%;
		height: 50px;
	}
	#bookmark-btn {
		height: 50px;
		background-color: transparent;
		border: 0;
	}
	@media screen and (max-width: 450px) {
		h2{
			max-width: 95%;
		}
		.jokeCard {
			min-width: 250px;
		}
		#setup{
			max-height: 150px;
			overflow: hidden;
			white-space: pre-line;
			text-overflow: ellipsis;
		}
		#delivery{
			max-height: 125px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		#body {
			text-overflow: ellipsis;
			overflow: scroll;
			min-height: 250px;
		}
	}
</style>
