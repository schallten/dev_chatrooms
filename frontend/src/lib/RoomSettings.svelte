<script>
    import { onMount } from 'svelte';
    import { apiFetch } from './api';

    export let room = null;
    export let onClose = () => {};

    let aiApiKey = '';
    let aiModel = 'gpt-4';
    let loading = true;
    let saving = false;

    const models = ['gpt-4', 'gpt-4o', 'claude-3', 'gemini-pro'];

    onMount(async () => {
        try {
            const settings = await apiFetch(`/rooms/${room.id}/settings`);
            aiApiKey = settings.ai_api_key || '';
            aiModel = settings.ai_model || 'gpt-4';
        } catch (e) {
            console.error('Failed to load settings:', e);
        } finally {
            loading = false;
        }
    });

    async function handleSave() {
        saving = true;
        try {
            await apiFetch(`/rooms/${room.id}/settings`, {
                method: 'PUT',
                body: JSON.stringify({
                    room_id: room.id,
                    ai_api_key: aiApiKey,
                    ai_model: aiModel
                })
            });
            onClose();
        } catch (e) {
            alert('Failed to save settings: ' + e.message);
        } finally {
            saving = false;
        }
    }
</script>

<div class="modal-overlay" on:click|self={onClose}>
    <div class="modal">
        <header>
            <h2>Room Settings: #{room.name}</h2>
            <button class="close" on:click={onClose}>&times;</button>
        </header>
        
        <div class="content">
            {#if loading}
                <p>Loading settings...</p>
            {:else}
                <div class="field">
                    <label>AI API Key</label>
                    <input type="password" bind:value={aiApiKey} placeholder="sk-..." />
                    <p class="help">Enter your OpenAI/Anthropic/Google API key for this room.</p>
                </div>
                
                <div class="field">
                    <label>AI Model</label>
                    <select bind:value={aiModel}>
                        {#each models as model}
                            <option value={model}>{model}</option>
                        {/each}
                    </select>
                </div>
            {/if}
        </div>
        
        <footer>
            <button class="save" on:click={handleSave} disabled={loading || saving}>
                {saving ? 'Saving...' : 'Save Settings'}
            </button>
            <button class="cancel" on:click={onClose}>Cancel</button>
        </footer>
    </div>
</div>

<style>
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    .modal {
        background: white;
        width: 100%;
        max-width: 450px;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    }
    header {
        padding: 1.25rem;
        background: #f8f9fa;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    header h2 { margin: 0; font-size: 1.1rem; }
    .close { background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #999; }
    
    .content { padding: 1.5rem; }
    .field { margin-bottom: 1.5rem; }
    label { display: block; font-weight: bold; margin-bottom: 0.5rem; color: #333; }
    input, select { width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 6px; outline: none; }
    input:focus, select:focus { border-color: #007bff; }
    .help { font-size: 0.8rem; color: #666; margin-top: 0.25rem; }
    
    footer { padding: 1.25rem; background: #f8f9fa; border-top: 1px solid #eee; display: flex; gap: 0.75rem; justify-content: flex-end; }
    button { padding: 0.6rem 1.2rem; border-radius: 6px; cursor: pointer; font-weight: bold; border: none; }
    .save { background: #007bff; color: white; }
    .save:disabled { background: #ccc; }
    .cancel { background: #e9ecef; color: #333; }
</style>
