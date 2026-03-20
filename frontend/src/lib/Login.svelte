<script>
    import { login } from './api';

    let username = '';
    let password = '';
    let error = '';
    let loading = false;

    async function handleSubmit() {
        error = '';
        loading = true;
        try {
            await login(username, password);
            window.location.hash = '#/app';
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    }
</script>

<div class="auth-container">
    <form on:submit|preventDefault={handleSubmit}>
        <h1>Login to Dev Chatrooms</h1>
        {#if error}
            <p class="error">{error}</p>
        {/if}
        <div class="field">
            <label for="username">Username</label>
            <input type="text" id="username" bind:value={username} required />
        </div>
        <div class="field">
            <label for="password">Password</label>
            <input type="password" id="password" bind:value={password} required />
        </div>
        <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
        </button>
        <p>Don't have an account? <a href="#/signup">Sign up</a></p>
    </form>
</div>

<style>
    .auth-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: #f4f4f9;
    }
    form {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        width: 100%;
        max-width: 400px;
    }
    h1 {
        margin-bottom: 1.5rem;
        text-align: center;
        font-size: 1.5rem;
    }
    .field {
        margin-bottom: 1rem;
    }
    label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: bold;
    }
    input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    button {
        width: 100%;
        padding: 0.75rem;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
    }
    button:disabled {
        background: #ccc;
    }
    .error {
        color: red;
        margin-bottom: 1rem;
        text-align: center;
    }
</style>
