<script>
    import { apiFetch } from './api';

    export let user = null;
    export let onUpdate = (updatedUser) => {};

    let editing = false;
    let avatarUrl = user?.avatar_url || '';
    let loading = false;

    async function handleSave() {
        loading = true;
        try {
            const updated = await apiFetch('/users/me', {
                method: 'PUT',
                body: JSON.stringify({ avatar_url: avatarUrl })
            });
            onUpdate(updated);
            editing = false;
        } catch (e) {
            alert('Update failed: ' + e.message);
        } finally {
            loading = false;
        }
    }
</script>

<div class="profile-card">
    <div class="avatar Large">
        {#if user.avatar_url}
            <img src={user.avatar_url} alt={user.username} />
        {:else}
            <div class="placeholder">{user.username[0].toUpperCase()}</div>
        {/if}
    </div>
    
    {#if editing}
        <div class="edit-form">
            <label>Avatar URL:</label>
            <input type="text" bind:value={avatarUrl} placeholder="https://..." />
            <div class="actions">
                <button on:click={handleSave} disabled={loading}>Save</button>
                <button class="cancel" on:click={() => editing = false}>Cancel</button>
            </div>
        </div>
    {:else}
        <div class="info">
            <h2>{user.username}</h2>
            <p>{user.email}</p>
            <p class="status-text">Status: {user.status}</p>
            <button on:click={() => editing = true}>Edit Profile</button>
        </div>
    {/if}
</div>

<style>
    .profile-card {
        padding: 2rem;
        background: white;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        width: 100%;
        max-width: 300px;
    }
    .avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin: 0 auto 1rem;
        overflow: hidden;
        background: #eee;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        color: #666;
    }
    .avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .edit-form input {
        width: 100%;
        padding: 0.5rem;
        margin-bottom: 1rem;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
    .actions {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
    }
    button {
        padding: 0.5rem 1rem;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    button.cancel {
        background: #6c757d;
    }
    h2 { margin: 0; }
    p { color: #666; font-size: 0.9rem; margin: 0.5rem 0; }
    .status-text { font-style: italic; }
</style>
