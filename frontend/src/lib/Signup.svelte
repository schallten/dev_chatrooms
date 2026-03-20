<script>
    import { signup } from './api';

    let username = '';
    let email = '';
    let password = '';
    let error = '';
    let loading = false;

    async function handleSubmit() {
        error = '';
        loading = true;
        try {
            await signup(username, email, password);
            window.location.hash = '#/login';
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    }
</script>

<div class="auth-container">
    <form on:submit|preventDefault={handleSubmit}>
        <h1>Create Account</h1>
        {#if error}
            <p class="error">{error}</p>
        {/if}
        <div class="field">
            <label for="username">Username</label>
            <input type="text" id="username" bind:value={username} required />
        </div>
        <div class="field">
            <label for="email">Email</label>
            <input type="email" id="email" bind:value={email} required />
        </div>
        <div class="field">
            <label for="password">Password</label>
            <input type="password" id="password" bind:value={password} required />
        </div>
        <button type="submit" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        <p>Already have an account? <a href="#/login">Login</a></p>
    </form>
</div>

<style>
    .auth-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: #e9ecef;
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
        background: #28a745;
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
