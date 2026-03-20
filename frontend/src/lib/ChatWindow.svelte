<script>
    import { onMount, onDestroy, afterUpdate } from 'svelte';
    import { apiFetch } from './api';
    import RoomSettings from './RoomSettings.svelte';

    export let room = null;
    export let user = null;
    export let isAdmin = false;

    let messages = [];
    let newMessage = '';
    let socket = null;
    let messageContainer;
    let showSettings = false;

    $: if (room) {
        connectWebSocket();
    }

    async function connectWebSocket() {
        if (socket) {
            socket.close();
            messages = [];
        }

        // Fetch history first
        try {
            messages = await apiFetch(`/rooms/${room.id}/messages`);
        } catch (e) {
            console.error('Failed to load history:', e);
        }

        const token = localStorage.getItem('token');
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        // Note: Hardcoded host and port for dev environment
        socket = new WebSocket(`${protocol}//localhost:8001/ws/${room.id}?token=${token}`);

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'message_new') {
                messages = [...messages, { ...data.message, reactions: [] }];
            } else if (data.type === 'reaction_new') {
                const { message_id, emoji } = data;
                messages = messages.map(m => {
                    if (m.id === message_id) {
                        const existing = m.reactions.find(r => r.emoji === emoji);
                        if (existing) {
                            existing.count++;
                            return { ...m, reactions: [...m.reactions] };
                        } else {
                            return { ...m, reactions: [...m.reactions, { emoji, count: 1 }] };
                        }
                    }
                    return m;
                });
            }
        };

        socket.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };

        socket.onclose = () => {
            console.log('WebSocket disconnected');
        };
    }

    function sendMessage() {
        if (!newMessage.trim() || !socket) return;
        
        socket.send(JSON.stringify({
            type: 'message_send',
            content: newMessage
        }));
        newMessage = '';
    }

    function addReaction(messageId, emoji) {
        if (!socket) return;
        socket.send(JSON.stringify({
            type: 'reaction_add',
            message_id: messageId,
            emoji
        }));
    }

    onDestroy(() => {
        if (socket) socket.close();
    });

    afterUpdate(() => {
        if (messageContainer) {
            messageContainer.scrollTop = messageContainer.scrollHeight;
        }
    });
</script>

<div class="chat-window">
    <div class="room-header">
        <div class="room-info">
            <h1># {room.name}</h1>
            <p>{room.description || ''}</p>
        </div>
        {#if isAdmin}
            <button class="settings-btn" on:click={() => showSettings = true}>⚙️ Settings</button>
        {/if}
    </div>
    
    {#if showSettings}
        <RoomSettings {room} onClose={() => showSettings = false} />
    {/if}
    <div class="messages" bind:this={messageContainer}>
        {#each messages as msg}
            <div class="message-container" class:own={msg.user_id === user.id}>
                <div class="message">
                    <div class="msg-header">
                        <span class="username">{msg.username}</span>
                        <span class="time">{new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <div class="msg-content">
                        {#each msg.content.split(/(@\w+)/) as part}
                            {#if part.startsWith('@')}
                                <span class="mention">{part}</span>
                            {:else}
                                {part}
                            {/if}
                        {/each}
                    </div>
                    <div class="reactions">
                        {#each msg.reactions as reaction}
                            <button class="reaction" on:click={() => addReaction(msg.id, reaction.emoji)}>
                                {reaction.emoji} <span>{reaction.count}</span>
                            </button>
                        {/each}
                        <button class="add-reaction" on:click={() => {
                            const emoji = prompt('Enter emoji:');
                            if (emoji) addReaction(msg.id, emoji);
                        }}>+</button>
                    </div>
                </div>
            </div>
        {/each}
        {#if messages.length === 0}
            <p class="empty">No messages yet. Start the conversation!</p>
        {/if}
    </div>
    <form class="input-area" on:submit|preventDefault={sendMessage}>
        <input 
            type="text" 
            placeholder="Message #{room.name}" 
            bind:value={newMessage}
        />
        <button type="submit" disabled={!newMessage.trim()}>Send</button>
    </form>
</div>

<style>
    .chat-window {
        flex: 1;
        display: flex;
        flex-direction: column;
        background: white;
        overflow: hidden;
    }
    .room-header {
        padding: 1rem 1.5rem;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
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
    .settings-btn {
        background: none;
        border: 1px solid #ddd;
        padding: 0.4rem 0.8rem;
        border-radius: 6px;
        cursor: pointer;
        color: #666;
        font-size: 0.9rem;
    }
    .settings-btn:hover {
        background: #f8f9fa;
        color: #333;
        border-color: #ccc;
    }
    .messages {
        flex: 1;
        padding: 1.5rem;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    .message-container {
        display: flex;
        flex-direction: column;
    }
    .message {
        max-width: 80%;
        display: flex;
        flex-direction: column;
    }
    .message-container.own {
        align-self: flex-end;
    }
    .message-container.own .message {
        align-items: flex-end;
    }
    .msg-header {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 0.2rem;
        font-size: 0.85rem;
    }
    .username {
        font-weight: bold;
        color: #333;
    }
    .time {
        color: #999;
    }
    .msg-content {
        background: #f1f0f0;
        padding: 0.6rem 0.8rem;
        border-radius: 8px;
        line-height: 1.4;
        word-break: break-word;
    }
    .message-container.own .msg-content {
        background: #007bff;
        color: white;
    }
    .mention {
        color: #007bff;
        font-weight: bold;
        background: rgba(0, 123, 255, 0.1);
        padding: 0 2px;
        border-radius: 2px;
    }
    .message-container.own .mention {
        color: #fff;
        background: rgba(255, 255, 255, 0.2);
    }
    .reactions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
        margin-top: 0.4rem;
    }
    .reaction {
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 12px;
        padding: 0.2rem 0.5rem;
        font-size: 0.8rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.3rem;
    }
    .reaction:hover {
        background: #e9ecef;
    }
    .reaction span {
        color: #666;
        font-weight: bold;
    }
    .add-reaction {
        background: none;
        border: 1px dashed #ccc;
        border-radius: 12px;
        width: 24px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        color: #999;
    }
    .add-reaction:hover {
        border-color: #999;
        color: #666;
    }
    .input-area {
        padding: 1rem 1.5rem;
        border-top: 1px solid #eee;
        display: flex;
        gap: 1rem;
    }
    input {
        flex: 1;
        padding: 0.75rem 1rem;
        border: 1px solid #ddd;
        border-radius: 6px;
        outline: none;
    }
    input:focus {
        border-color: #007bff;
    }
    button {
        padding: 0 1.5rem;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: bold;
    }
    button:disabled {
        background: #ccc;
    }
    .empty {
        text-align: center;
        color: #888;
        margin-top: 2rem;
    }
</style>
