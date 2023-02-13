<script lang="ts">
	import { goto } from '$app/navigation';
    import { JokeModel } from '$lib/logic/JokeModel';
	import JokeCard from '../JokeCard.svelte';
    import { myJokesStore } from '$lib/stores/myJokesStore';
	import { onMount } from 'svelte';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
    onMount(()=>{
        const jokesList:JokeModel[] = [];
        data.myJokes.forEach((entry)=>jokesList.push(new JokeModel(entry)))
        myJokesStore.set(jokesList)
    })

    async function logOut(){
        const resp = await fetch("/api/auth",{method:"PUT"})
        if(resp.ok){
            goto("/")
        }
    }
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>

<div>
	<main>
        <div id="btn-wrapper">
            <button on:click={()=>logOut()}>Logout</button>
        </div>
		<div class="column">
            {#if $myJokesStore.length === 0}
                <p>No jokes found, please bookmark some one the <a href="/">Homepage</a>
                </p>
            {/if}
			{#each $myJokesStore as joke}
				<JokeCard {joke} />
			{/each}
		</div>
	</main>
</div>
<style>
    #btn-wrapper{
        display: inline-flex;
        justify-content: end;
        width: 99%;
        margin: 8px;
    }
    button{
        background-color: white;
        color:blue;
        border: 0px;
    }
    .column{
        display: grid;
        justify-content: center;
        align-content: center;
    }
</style>