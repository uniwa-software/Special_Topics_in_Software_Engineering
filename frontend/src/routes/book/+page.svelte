<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import { writable, get } from 'svelte/store';
	import { authStore } from '$lib/stores/auth';
	import { onMount } from 'svelte';

	onMount(async () => {
		const auth = get(authStore);
		if (!auth?.token) {
			console.log(auth);
			goto('/auth/login');
		}
	});

	// Time slot generation
	const startTime = new Date();
	startTime.setHours(10, 0, 0, 0);

	const endTime = new Date();
	endTime.setHours(17, 0, 0, 0);

	const timeSlots = [];
	const duration = 45 * 60 * 1000;

	let time = new Date(startTime);
	while (time <= endTime) {
		timeSlots.push(new Date(time));
		time = new Date(time.getTime() + duration);
	}

	// State variables
	const selectedTime = writable(null);
	const selectedDate = writable(new Date().toISOString().split('T')[0]); // Default to today
	let selectedBarber = 'Νίκος';
	let appointmentType = 'Κλασικό Κουρεμά';

	// Functions
	function selectTime(slot) {
		selectedTime.set(slot);
	}

	async function bookAppointment() {
		const user = get(authStore).user;

		// Combine the selected date and time
		const selectedDateTime = new Date(
			`${$selectedDate}T${$selectedTime.getHours().toString().padStart(2, '0')}:${$selectedTime.getMinutes().toString().padStart(2, '0')}:00.000Z`
		);
		const appointmentData = {
			username: user?.username || 'Guest',
			date: selectedDateTime,
			employee: selectedBarber,
			type: appointmentType
		};

		try {
			const response = await fetch('http://localhost:3000/api/appointments', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(appointmentData)
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Πρόβλημα με την κράτηση!');
			}

			alert('Το ραντεβού καταγράφηκε!');
		} catch (error) {
			alert(error.message || 'Πρόβλημα με την κράτηση!');
		}
	}

	function goToHome() {
		goto('/');
	}
</script>

<!-- Back to Home Button -->
<div class="absolute top-4 left-4">
	<button
		on:click={goToHome}
		class="bg-[#68B0AB] text-[#FAF3DD] py-2 px-4 rounded-lg shadow-md hover:opacity-90 transition-all duration-300"
	>
		Back to Home
	</button>
</div>

<!-- Calendar UI -->
<div
	class="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#8FC0A9] to-[#68B0AB] py-8"
>
	<div class="bg-[#FAF3DD] p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
		<h2 class="text-2xl font-semibold mb-6 text-center text-[#68B0AB]">Κλείστε ραντεβού</h2>

		<!-- Day Selection -->
		<span class="block my-2 text-[#68B0AB] font-semibold">Επιλέξτε Ημέρα:</span>
		<input
			type="date"
			bind:value={$selectedDate}
			min={new Date().toISOString().split('T')[0]}
			class="w-full mb-4 p-2 rounded-md shadow-md bg-[#8FC0A9] text-[#FAF3DD]"
		/>

		<!-- Time Selection -->
		<span class="block my-2 text-[#68B0AB] font-semibold">Επιλέξτε Ώρα:</span>
		<div class="grid grid-cols-2 tab:grid-cols-3 gap-4">
			{#each timeSlots as slot (slot.getTime())}
				<button
					on:click={() => selectTime(slot)}
					class="py-2 px-4 rounded-md shadow-md bg-[#8FC0A9] text-[#FAF3DD] hover:opacity-90 transition-all duration-300"
					class:selected={$selectedTime === slot}
				>
					{slot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
				</button>
			{/each}
		</div>

		<!-- Barber Selection -->
		<span class="block my-2 text-[#68B0AB] font-semibold">Επιλογή Μπαρμπέρη:</span>
		<select
			bind:value={selectedBarber}
			class="w-full mb-4 p-2 rounded-md shadow-md bg-[#8FC0A9] text-[#FAF3DD]"
		>
			<option value="Νίκος">Νίκος</option>
			<option value="Φίλιππος">Φίλιππος</option>
		</select>

		<!-- Appointment Type Selection -->
		<span class="block mb-2 text-[#68B0A9] font-semibold">Τύπος ραντεβού:</span>
		<select
			bind:value={appointmentType}
			class="w-full mb-6 p-2 rounded-md shadow-md bg-[#8FC0A9] text-[#FAF3DD]"
		>
			<option value="Κλασικό Κουρεμά">Κλασικό Κουρεμά 10$</option>
			<option value="Περιποίηση γενειάδας">Περιποίηση γενειάδας 15$</option>
			<option value="Πακέτο Premium">Πακέτο Premium 25#</option>
		</select>

		{#if $selectedTime}
			<div class="mt-3 text-center">
				<p class="text-lg text-[#68B0A9]">
					<strong>Ημέρα:</strong>
					{$selectedDate}<br />
					<strong>Ώρα:</strong>
					{$selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}<br />
					<strong>Μπαρμπέρης:</strong>
					{selectedBarber}<br />
					<strong>Τύπος:</strong>
					{appointmentType}
				</p>
				<button
					on:click={bookAppointment}
					class="mt-4 bg-[#68B0AB] text-[#FAF3DD] py-2 px-4 rounded-md shadow-md hover:opacity-90 transition-all duration-300"
				>
					Επιβεβαίωση Κράτησης
				</button>
			</div>
		{/if}
	</div>
</div>

<style>
	.selected {
		background-color: #68b0ab;
		color: #faf3dd;
		font-weight: bold;
	}
</style>
