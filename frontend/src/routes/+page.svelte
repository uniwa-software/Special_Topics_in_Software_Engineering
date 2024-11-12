<script>
	import logo from '$lib/images/logo.png';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';
	import { authStore } from '$lib/stores/auth';
	

	const handleRegister = () => {
    	goto("/auth/register")
  	};
  
  	const handleLogin = () => {
    	goto("/auth/login")
  	};

	  const handleBook = () => {
    	goto("/book")
  	};

</script>

<svelte:head>
	<title>Comb Barbershop</title>
	<meta name="description" content="Demo project for the Full SvelteKit" />
</svelte:head>

<body>
	<header class="h-15 z-10 fixed w-full bg-comb-white/90">
		<div class="container h-full flex justify-between items-center">
		  <img class="h-8 w-8 rounded-xl" src={logo} alt="Logo" />
		  
		  <div class="flex items-center gap-4">
			<button
			  on:click={handleRegister}
			  class="{get(authStore) ? 'hidden' : ''} px-4 py-1.5 text-[#FAF3DD] bg-[#68B0AB] hover:bg-[#8FC0A9] rounded-xl transition-colors duration-300 text-sm font-medium shadow-sm"
			>
			  Register
			</button>
			
			<button
			  on:click={handleLogin}
			  class="{get(authStore) ? 'hidden' : ''} px-4 py-1.5 border-2 border-[#68B0AB] text-[#68B0AB] hover:bg-[#FAF3DD] rounded-xl transition-colors duration-300 text-sm font-medium"
			>
			  Login
			</button>
			
			<!-- Book Now Button -->
			<button 
			on:click={handleBook}
			class="{get(authStore) ? '' : 'hidden'} bg-comb-cyan py-2 px-3 rounded-xl flex gap-1 hover:bg-comb-blue duration-300 text-white"
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
				<path d="M3 19a9 9 0 0 1 9 0 9 9 0 0 1 9 0M3 6a9 9 0 0 1 9 0 9 9 0 0 1 9 0M3 6v13M12 6v13M21 6v13" />
			  </svg>
			  BOOK NOW
			</button> 
		  </div>
		</div>
	  </header>

	<section class="bg-bg-1 h-screen">
		<div class="container"></div>
		<svg
			class="absolute bottom-[-1px] rotate-180"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1000 100"
			preserveAspectRatio="none"><path fill="#ffff" d="M0 6V0h1000v100L0 6z" /></svg
		>
	</section>
	<section class="bg-white h-[50vh] relative">
		<div class="container">
			<h2 class="text-center text-4xl font-bold">TITLE TILTE</h2>
		</div>
	</section>
	<section class="bg-bg-2 h-screen relative">
		<svg
			class="absolute top-0 rotate-y-180"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1000 100"
			preserveAspectRatio="none"><path fill="#ffff" d="M0 6V0h1000v100L0 6z" /></svg
		>
		<div class="container">
			<h2 class="text-center text-4xl font-bold">TITLE TILTE</h2>
		</div>
		<svg
		class="absolute bottom-[-1px] rotate-180"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 1000 100"
		preserveAspectRatio="none"><path fill="#ffff" d="M0 6V0h1000v100L0 6z" /></svg
	>
	</section>
	<section class="bg-white h-[50vh] relative">
		<div class="container">
			<h2 class="text-center text-4xl font-bold">Που βρισκόμαστε</h2>
		</div>
	</section>
	<section class="bg-bg-3 bg-cover h-screen relative">
		<svg
			class="absolute top-0 rotate-y-180"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1000 100"
			preserveAspectRatio="none"><path fill="#ffff" d="M0 6V0h1000v100L0 6z" /></svg
		>
		<div class="container">
			<h2 class="text-center text-4xl font-bold">TITLE TILTE</h2>
		</div>
	</section>

	<footer class="bg-comb-white h-[400px] border-t-4 border-comb-cyan">
		<div class="container">


		</div>
	</footer>

</body>
