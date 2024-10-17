<script>
	export let data;
</script>

<header class="h-14 bg-slate-500">test</header>

<div class="container">
	{#if data.users.length > 0}
		<ul>
			{#each data.appointments as appointment}
				<li>
					<strong>Username:</strong>
					{appointment.id}
				</li>
			{/each}

			{#each data.users as user}
				<li>
					<strong>Username:</strong>
					{user.username},
					<strong>Email:</strong>
					{user.email},
					<strong>Phone:</strong>
					{user.phone || 'N/A'},
					<strong>Role:</strong>
					{user.role}
				</li>
			{/each}
		</ul>
	{:else}
		<p>No users found.</p>
	{/if}
</div>
