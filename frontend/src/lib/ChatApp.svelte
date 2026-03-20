<script>
    import { getMe, logout } from './api';
    import { onMount } from 'svelte';
    import Sidebar from './Sidebar.svelte';
    import ChatWindow from './ChatWindow.svelte';

    let user = null;
    let roles = [];
    let loading = true;
    let error = '';
    let currentRoom = null;

    $: isAdmin = roles.includes('admin');

    onMount(async () => {
        try {
            user = await getMe();
            roles = await apiFetch('/roles/me');
        } catch (e) {
            error = e.message;
            window.location.hash = '#/login';
        } finally {
            loading = false;
        }
    });

    function handleLogout() {
        logout();
        window.location.hash = '#/login';
    }

    function handleRoomSelect(room) {
        currentRoom = room;
    }

    async function updateStatus(newStatus) {
        try {
            await apiFetch('/status', {
                method: 'POST',
                body: JSON.stringify({ status: newStatus })
            });
            user = { ...user, status: newStatus };
        } catch (e) {
            console.error('Failed to update status:', e);
        }
    }
</script>

<div class="app-container">
    {#if loading}
        <div class="centered">
            <p>Loading...</p>
        </div>
    {:else if error}
        <div class="centered">
            <p class="error">{error}</p>
        </div>
    {:else}
        <header>
            <div class="header-left">
                <div class="logo">Dev Chatrooms</div>
                <div class="status-picker">
                    <select value={user.status} on:change={(e) => updateStatus(e.target.value)}>
                        <option value="online">Online</option>
                        <option value="busy">Busy</option>
                        <option value="offline">Offline</option>
                    </select>
                </div>
            </div>
            <div class="user-info">
                <span>{user.username}</span>
                {#if isAdmin}
                    <span class="admin-badge">Admin</span>
                {/if}
                <button on:click={handleLogout} class="logout-btn">Logout</button>
            </div>
        </header>
        <div class="main-content">
            <Sidebar currentRoomId={currentRoom?.id} onRoomSelect={handleRoomSelect} />
            <main class="chat-area">
                {#if currentRoom}
                    <ChatWindow room={currentRoom} {user} {isAdmin} />
                {:else}
                    <div class="centered">
                        <p>Select a room to start chatting</p>
                    </div>
                {/if}
            </main>
        </div>
    {/if}
</div>

<style>
    .app-container {
        height: 100vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    header {
        background: #1a1a1a;
        color: white;
        padding: 0.75rem 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #333;
    }
    .header-left {
        display: flex;
        align-items: center;
        gap: 2rem;
    }
    .status-picker select {
        background: #333;
        color: #eee;
        border: 1px solid #444;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        font-size: 0.85rem;
        outline: none;
    }
    .logo {
        font-weight: bold;
        font-size: 1.2rem;
    }
    .user-info {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    .logout-btn {
        background: none;
        border: 1px solid #444;
        color: #ccc;
        padding: 0.4rem 0.8rem;
        border-radius: 4px;
        cursor: pointer;
    }
    .logout-btn:hover {
        background: #333;
        color: white;
    }
    .admin-badge {
        background: #e74c3c;
        color: white;
        font-size: 0.7rem;
        padding: 0.1rem 0.4rem;
        border-radius: 4px;
        text-transform: uppercase;
        font-weight: bold;
    }
    .main-content {
        flex: 1;
        display: flex;
        overflow: hidden;
    }
    .chat-area {
        flex: 1;
        display: flex;
        flex-direction: column;
        background: #ffffff;
    }
    .room-header {
        padding: 1rem 1.5rem;
        border-bottom: 1px solid #eee;
    }
    .room-header h1 {
        margin: 0;
        font-size: 1.25rem;
    }
    .room-header p {
        margin: 0.25rem 0 0 0;
        color: #666;
        font-size: 0.9rem;
    }
    .messages {
        flex: 1;
        padding: 1.5rem;
        overflow-y: auto;
    }
    .centered {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        color: #888;
    }
</style>
