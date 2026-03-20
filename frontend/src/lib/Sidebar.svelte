<script>
    import { onMount } from 'svelte';
    import { apiFetch } from './api';

    export let currentRoomId = null;
    export let onRoomSelect = (room) => {};

    let rooms = [];
    let loading = true;
    let error = '';

    async function loadRooms() {
        try {
            rooms = await apiFetch('/rooms');
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    }

    onMount(loadRooms);

    async function createRoom() {
        const name = prompt('Room name:');
        if (!name) return;
        try {
            const newRoom = await apiFetch('/rooms', {
                method: 'POST',
                body: JSON.stringify({ name, description: '' })
            });
            rooms = [...rooms, newRoom];
            onRoomSelect(newRoom);
        } catch (e) {
            alert('Failed to create room: ' + e.message);
        }
    }
</script>

<aside class="sidebar">
    <div class="header">
        <h2>Rooms</h2>
        <button class="add-btn" on:click={createRoom}>+</button>
    </div>
    <div class="room-list">
        {#if loading}
            <p>Loading rooms...</p>
        {:else if error}
            <p class="error">{error}</p>
        {:else}
            {#each rooms as room}
                <button 
                    class="room-item" 
                    class:active={currentRoomId === room.id}
                    on:click={() => onRoomSelect(room)}
                >
                    # {room.name}
                </button>
            {/each}
        {/if}
    </div>
</aside>

<style>
    .sidebar {
        width: 260px;
        background: #2c3e50;
        color: white;
        display: flex;
        flex-direction: column;
        border-right: 1px solid #34495e;
    }
    .header {
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #34495e;
    }
    h2 {
        margin: 0;
        font-size: 1.2rem;
    }
    .add-btn {
        background: #3498db;
        color: white;
        border: none;
        border-radius: 4px;
        width: 24px;
        height: 24px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
    }
    .room-list {
        flex: 1;
        overflow-y: auto;
        padding: 0.5rem;
    }
    .room-item {
        width: 100%;
        text-align: left;
        background: none;
        border: none;
        color: #bdc3c7;
        padding: 0.75rem 1rem;
        cursor: pointer;
        border-radius: 4px;
        margin-bottom: 0.25rem;
        font-size: 1rem;
    }
    .room-item:hover {
        background: #34495e;
        color: white;
    }
    .room-item.active {
        background: #3498db;
        color: white;
    }
    .error {
        color: #e74c3c;
        padding: 1rem;
        font-size: 0.9rem;
    }
</style>
