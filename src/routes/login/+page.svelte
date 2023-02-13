<script lang="ts">
	import { goto } from '$app/navigation';

	let email: string;
	let password: string;
	async function login() {
		try {
			const resp = await fetch('/api/auth', {
				method: 'POST',
				body: JSON.stringify({ email: email, password: password, login: true })
			});
			if (resp.ok) {
				goto('/my-jokes');
			}
		} catch (e) {
			console.error(e);
		}
	}
	async function register() {
		try {
			await fetch('/api/auth', {
				method: 'POST',
				body: JSON.stringify({ email: email, password: password, login: false })
			});
			goto('/my-jokes');
		} catch (e) {
			console.error(e);
		}
	}
</script>

<svelte:head>
	<meta name="description" content="Login/Register Page" />
</svelte:head>

<main>
	<title>Login/Register</title>
	<div id="login-card">
		<h1>Login / Register</h1>
		<form action="">
			<div class="column">
				<p>Email:</p>
				<input type="email" bind:value={email} autocomplete="username" />
				<p>Password:</p>
				<input type="password" bind:value={password} autocomplete="current-passwords" />
				<div class="row">
					<input type="button" value="Login" on:click={() => login()} />
					<input type="button" value="Register" on:click={() => register()} />
				</div>
			</div>
		</form>
	</div>
</main>

<style>
	main {
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	#login-card {
		border: 1px solid black;
		width: 50%;
		margin: 0 auto;
		min-height: 30vh;
		max-height: 300px;
		width: 30vw;
		margin: 8px;
		padding: 16px;
		max-width: 300px;
	}
	#login-card p {
		font-weight: 600;
	}
	#login-card h1 {
		text-align: center;
	}
	#login-card input[type='button'] {
		margin: 2px;
		background-color: white;
		border: 1px solid black;
		box-shadow: 1px 1px 1px 1px grey;
	}
	#login-card input[type='button']:hover {
		background-color: whitesmoke;
	}
	.column {
		display: grid;
	}
	.column input {
		height: 30px;
	}
	.row {
		margin: 8px;
		display: grid;
		align-content: center;
		justify-content: center;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr;
	}
</style>
