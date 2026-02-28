import React, { createContext, useContext, useState, useEffect } from 'react';
import { roomAPI } from '../services/api';
import { socketService } from '../services/socket';

const RoomContext = createContext();

export const useRoom = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoom must be used within RoomProvider');
  }
  return context;
};

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all rooms
  const fetchRooms = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await roomAPI.listRooms();
      setRooms(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper that converts backend payload to UI shape
  const normalize = (msg) => {
    if (!msg) return null;
    return {
      id: msg.id,
      text: msg.content || msg.text || '',
      user: msg.user_name || msg.user || (msg.is_ai ? 'AI Assistant' : 'Unknown'),
      timestamp: msg.timestamp,
      isAI: msg.is_ai || msg.isAI || false,
      isCode: msg.is_code || msg.isCode || false,
      language: msg.language,
      room_id: msg.room_id,
    };
  };

  // Join room and fetch messages
  const joinRoom = async (roomId) => {
    setLoading(true);
    setError(null);
    try {
      const room = rooms.find((r) => r.id === roomId);
      setCurrentRoom(room);
      
      // Fetch messages
      const data = await roomAPI.getRoomMessages(roomId);
      const normalized = data.map(normalize).filter(Boolean);
      setMessages(normalized);
      
      // Join via Socket.IO
      socketService.joinRoom(roomId);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Send message
  const sendMessage = (content) => {
    if (!currentRoom) return;
    socketService.sendMessage(currentRoom.id, content);
  };

  // Listen for new messages from socket
  useEffect(() => {
    const unsubscribe = socketService.on('new_message', (message) => {
      if (!message) return; // guard against bad payload
      // Only add message if it's for current room
      if (message.room_id === currentRoom?.id) {
        setMessages((prev) => [...prev, normalize(message)]);
      }
    });

    return unsubscribe;
  }, [currentRoom?.id]);

  // Fetch rooms on mount
  useEffect(() => {
    fetchRooms();
  }, []);

  const value = {
    rooms,
    currentRoom,
    messages,
    loading,
    error,
    fetchRooms,
    joinRoom,
    sendMessage,
    setCurrentRoom,
  };

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};
