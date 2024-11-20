<script>
	import logo from '$lib/images/logo.png';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';
	import { authStore } from '$lib/stores/auth';
	import Footer from '$lib/components/Footer.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Cards from '$lib/components/Cards.svelte';
	import Gaol from '$lib/components/Gaol.svelte';

	const handleRegister = () => {
		goto('/auth/register');
	};

	const handleLogin = () => {
		goto('/auth/login');
	};

	const handleBook = () => {
		goto('/book');
	};

	const handleLogout = () => {
		authStore.set(null);
		localStorage.removeItem('auth');
		window.location.reload();
	};
</script>

<svelte:head>
	<title>Comb Barbershop</title>
	<meta name="description" content="Demo project for the Full SvelteKit" />
</svelte:head>

<body>
	<header class="fixed top-2 left-1 right-1 z-10 tab:top-4 tab:left-4 tab:right-4">
		<div class=" w-80 mx-auto bg-comb-white/90 rounded-full py-2 px-6 shadow-lg tab:w-1/4">
			<div class=" h-auto flex justify-center items-center tab:justify-between">
				<img class="h-8 w-8 rounded-xl pr-2" src={logo} alt="Logo" />

				<div class="flex items-center gap-2 tab:gap-4">
					<button
						on:click={handleRegister}
						class="{get(authStore)
							? 'hidden'
							: ''} px-4 py-1.5 text-[#FAF3DD] bg-[#68B0AB] hover:bg-[#8FC0A9] rounded-xl transition-colors duration-300 text-sm font-medium shadow-sm"
					>
						Register
					</button>

					<button
						on:click={handleLogin}
						class="{get(authStore)
							? 'hidden'
							: ''} px-4 py-1.5 border-2 border-[#68B0AB] text-[#68B0AB] hover:bg-[#FAF3DD] rounded-xl transition-colors duration-300 text-sm font-medium"
					>
						Login
					</button>
					<button
						on:click={handleLogout}
						class="{get(authStore) ? '' : 'hidden'} rounded-xl bg-comb-blue px-4 py-1.5
						 text-comb-white transition-all duration-300 hover:bg-red-500 hover:shadow-lg active:scale-95"
					>
					<span class="whitespace-nowrap">Log out</span>
					</button>
					<button
						on:click={handleBook}
						class="{get(authStore) ? '' : 'hidden'} bg-comb-cyan py-1.5 px-4 rounded-xl
   									flex items-center gap-2 hover:bg-comb-blue duration-300 text-white
  									text-sm sm:text-base font-medium flex-shrink-0"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="icon icon-tabler icons-tabler-outline icon-tabler-book"
						>
							<path d="M0 0h24v24H0z" stroke="none" />
							<path
								d="M3 19a9 9 0 0 1 9 0 9 9 0 0 1 9 0M3 6a9 9 0 0 1 9 0 9 9 0 0 1 9 0M3 6v13M12 6v13M21 6v13"
							/>
						</svg>
						<span class="whitespace-nowrap">BOOK NOW</span>
					</button>
				</div>
			</div>
		</div>
	</header>

	<Hero />
	<Cards />

	<section class="bg-bg-2 h-screen relative">
		<svg
			class="absolute top-0 rotate-y-180"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1000 100"
			preserveAspectRatio="none"><path fill="#ffff" d="M0 6V0h1000v100L0 6z" /></svg
		>
		<svg
			class="absolute bottom-[-1px] rotate-180"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1000 100"
			preserveAspectRatio="none"><path fill="#ffff" d="M0 6V0h1000v100L0 6z" /></svg
		>
	</section>

	<Gaol />

	<section class="bg-bg-3 bg-cover h-screen relative">
		<svg
			class="absolute top-0 rotate-y-180"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1000 100"
			preserveAspectRatio="none"><path fill="#ffff" d="M0 6V0h1000v100L0 6z" /></svg
		>
	</section>

	<Footer />
</body>
