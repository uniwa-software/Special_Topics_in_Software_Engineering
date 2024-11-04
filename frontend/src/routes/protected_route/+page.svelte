<script>
    import { onMount } from 'svelte';
    import { authenticatedFetch } from '$lib/utils/api';
    import { authStore } from '$lib/stores/auth';
    
    let isLoading = true;
    let error = null;
    let verified = false;

    onMount(async () => {
        try {
            const response = await authenticatedFetch('http://localhost:3000/api/verify-token');
            const result = await response.json();
            console.log('Token verification:', result);
            verified = true;
        } catch (error) {
            console.error('Verification failed:', error);
            // @ts-ignore
            error = error.message;
        } finally {
            isLoading = false;
        }
    });
</script>

{#if isLoading}
    <p>Loading...</p>
{:else if error}
    <p class="error">Error: {error}</p>
{:else}
    <h1>Protected Route</h1>
    {#if $authStore?.user}
        <p>Welcome, {$authStore.user.username}!</p>
        <p>Role: {$authStore.user.role}</p>
    {/if}
    {#if verified}
        <p>✅ Token verified</p>
    {/if}
{/if}