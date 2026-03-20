<script>
    import { onMount } from 'svelte';
    import Home from './lib/Home.svelte';
    import Login from './lib/Login.svelte';
    import Signup from './lib/Signup.svelte';
    import ChatApp from './lib/ChatApp.svelte';

    let currentHash = window.location.hash || '#/';
    
    function handleHashChange() {
        currentHash = window.location.hash || '#/';
    }

    onMount(() => {
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    });

    $: component = currentHash.startsWith('#/login') ? Login :
                  currentHash.startsWith('#/signup') ? Signup :
                  currentHash.startsWith('#/app') ? ChatApp : Home;
</script>

<svelte:component this={component} />

<style>
    :global(body) {
        margin: 0;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: #f4f4f4;
        color: #333;
    }
</style>
