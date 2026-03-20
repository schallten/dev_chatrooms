<div class="home-container">
    <h1>Dev Chatrooms</h1>
    <p>Internal team chat for organizations</p>
    <div class="actions">
        <a href="#/login" class="btn primary">Login</a>
        <a href="#/signup" class="btn secondary">Signup</a>
    </div>
</div>

<style>
    .home-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: #343a40;
        color: white;
        text-align: center;
    }
    h1 {
        font-size: 3rem;
        margin-bottom: 0.5rem;
    }
    p {
        font-size: 1.25rem;
        margin-bottom: 2rem;
        opacity: 0.8;
    }
    .actions {
        display: flex;
        gap: 1rem;
    }
    .btn {
        padding: 0.75rem 2rem;
        border-radius: 4px;
        text-decoration: none;
        font-weight: bold;
    }
    .primary {
        background: #007bff;
        color: white;
    }
    .secondary {
        border: 1px solid white;
        color: white;
    }
</style>
