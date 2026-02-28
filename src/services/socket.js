/**
 * Socket.IO Service
 * Manages real-time WebSocket communication with backend
 */

import io from 'socket.io-client';
import { tokenAPI } from './api';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

let socket = null;
let listeners = {};

export const socketService = {
  // Initialize socket connection
  connect: () => {
    if (socket?.connected) return socket;

    socket = io(SOCKET_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      transports: ['websocket', 'polling'],
    });

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
      // Authenticate after connection
      const token = tokenAPI.getToken();
      if (token) {
        socket.emit('auth', { token });
      }
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socket.on('auth_success', (data) => {
      console.log('Socket authenticated:', data.email);
      // Trigger any auth success listeners
      if (listeners['auth_success']) {
        listeners['auth_success'].forEach((cb) => cb(data));
      }
    });

    socket.on('auth_error', (data) => {
      console.error('Socket auth error:', data.detail);
      if (listeners['auth_error']) {
        listeners['auth_error'].forEach((cb) => cb(data));
      }
    });

    socket.on('new_message', (data) => {
      if (listeners['new_message']) {
        listeners['new_message'].forEach((cb) => cb(data));
      }
    });

    socket.on('error', (data) => {
      console.error('Socket error:', data);
      if (listeners['error']) {
        listeners['error'].forEach((cb) => cb(data));
      }
    });

    return socket;
  },

  // Disconnect socket
  disconnect: () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  },

  // Get socket instance
  getSocket: () => socket,

  // Join room
  joinRoom: (roomId) => {
    if (!socket) {
      console.error('Socket not connected');
      return;
    }
    socket.emit('join', { room_id: roomId });
  },

  // Send message
  sendMessage: (roomId, content) => {
    if (!socket) {
      console.error('Socket not connected');
      return;
    }
    socket.emit('message', { room_id: roomId, content });
  },

  // Subscribe to events
  on: (event, callback) => {
    if (!listeners[event]) {
      listeners[event] = [];
    }
    listeners[event].push(callback);

    // Also add to socket if socket exists
    if (socket && event !== 'auth_success' && event !== 'auth_error') {
      socket.on(event, callback);
    }

    // Return unsubscribe function
    return () => {
      listeners[event] = listeners[event].filter((cb) => cb !== callback);
    };
  },

  // Subscribe to event once
  once: (event, callback) => {
    if (socket) {
      socket.once(event, callback);
    } else {
      // If socket not ready, wait for it
      const unsubscribe = socketService.on(event, (...args) => {
        callback(...args);
        unsubscribe();
      });
    }
  },

  // Check if connected
  isConnected: () => socket?.connected ?? false,
};
