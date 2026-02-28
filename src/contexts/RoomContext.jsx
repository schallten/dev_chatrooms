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

  // Join room and fetch messages
  const joinRoom = async (roomId) => {
    setLoading(true);
    setError(null);
    try {
      const room = rooms.find((r) => r.id === roomId);
      setCurrentRoom(room);
      
      // Fetch messages
      const data = await roomAPI.getRoomMessages(roomId);
      setMessages(data);
      
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
      // Only add message if it's for current room
      if (message.room_id === currentRoom?.id) {
        setMessages((prev) => [...prev, message]);
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
