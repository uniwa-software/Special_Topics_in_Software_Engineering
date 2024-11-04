<script>
    import { enhance } from '$app/forms';
    import { goto } from "$app/navigation"
    import { authStore , setAuth } from '$lib/stores/auth';
    import { get } from 'svelte/store';
    import { onMount } from 'svelte';
  
     let user = {
        username: '',
        password: ''
     };

     onMount(async () => {
      const auth = get(authStore);
      if(auth?.token){
        console.log(auth)
        goto('/');
      }
    });
    
    let error = "";

     function handleSubmit(){
        // @ts-ignore
        return async ({ result }) => {
            if (result.type === 'success') {
              console.log(result);
                setAuth({
                token:result.data.token,
                user:result.data.user,
            })
            const auth = get(authStore);
            console.log("\nAuth store : ",auth);
            goto('/');
            } else {
                console.log(result)
                error = result.data?.error.error || 'Login failed';
            }
        };
    };

    function goToHome(){
      goto('/');
    }
    
</script>

<div class="absolute top-4 left-4">
  <button
    on:click={goToHome}
    class="bg-[#68B0AB] text-[#FAF3DD] py-2 px-4 rounded-lg shadow-md hover:opacity-90 transition-all duration-300"
  >
    Back to Home
  </button>
</div>

<div class="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#8FC0A9] to-[#68B0AB]">
    <div class="bg-[#FAF3DD] p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 class="text-center text-[#696D7D] text-2xl font-semibold mb-1">Login</h1>
        <h1 class="text-center text-[#696D7D] text-2xl font-semibold mb-6">Happy to see you again!</h1>
      
      <form method="post" use:enhance={handleSubmit}>
        <input 
          name="username" 
          type="text" 
          bind:value={user.username} 
          placeholder="Username" 
          class="input w-full border-2 border-[#C8D5B9] rounded-lg p-2 mb-4 
                 focus:outline-none focus:border-[#68B0AB] bg-white
                 placeholder:text-[#696D7D]/60 text-[#696D7D]"
          required
        />
        
        <input 
          name="password" 
          type="password" 
          bind:value={user.password} 
          placeholder="Password" 
          class="input w-full border-2 border-[#C8D5B9] rounded-lg p-2 mb-4 
                 focus:outline-none focus:border-[#68B0AB] bg-white
                 placeholder:text-[#696D7D]/60 text-[#696D7D]"
          required
        />
        
        
        <div class="text-center text-[#696D7D] mb-6">
          <span>Don't have an account?</span>
          <a 
            href="/auth/register" 
            class="ml-2 no-underline text-[#68B0AB] hover:underline hover:opacity-80 transition-all duration-300"
          >
            Register
          </a>
        </div>
        
        <button 
          type="submit" 
          class="w-full p-2 rounded-lg bg-gradient-to-br from-[#8FC0A9] to-[#68B0AB] 
                 text-[#FAF3DD] cursor-pointer hover:opacity-90 transition-all duration-300
                 font-medium shadow-md"
        >
          Login
        </button>
      </form>
    </div>
  </div>