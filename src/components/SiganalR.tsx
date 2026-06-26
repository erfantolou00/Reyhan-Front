// components/SocketComponent.js
import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  message: string;
  timestamp: string;
}

const STORAGE_KEY = 'chatMessages';

const SocketComponent = () => {
  // Initialize state with localStorage data
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        console.log('Loading from localStorage:', saved);
        return saved ? JSON.parse(saved) : [];
      } catch (error) {
        console.error('Error loading from localStorage:', error);
        return [];
      }
    }
    return [];
  });
  const [inputMessage, setInputMessage] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);

  // Save to localStorage function
  const saveToStorage = useCallback((newMessages: Message[]) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newMessages));
        console.log('Saved to localStorage:', newMessages);
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }, []);

  // Save to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      saveToStorage(messages);
    }
  }, [messages, saveToStorage]);

  useEffect(() => {
    const socketInstance = io('http://localhost:3001');

    socketInstance.on('connect', () => {
      console.log('Connected to Socket.IO server');
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
      setIsConnected(false);
    });

    socketInstance.on('message', (message) => {
      console.log('Message received:', message);
      const newMessage = { message, timestamp: new Date().toISOString() };
      setMessages(prev => {
        const updated = [...prev, newMessage];
        // Save immediately after adding new message
        saveToStorage(updated);
        return updated;
      });
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [saveToStorage]);

  const sendMessage = () => {
    if (inputMessage.trim() && socket) {
      socket.emit('message', inputMessage);
      setInputMessage('');
    }
  };

  const clearMessages = () => {
    setMessages([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
      console.log('Cleared localStorage');
    }
  };

  // Debug function to check localStorage
  const checkStorage = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      console.log('Current localStorage content:', saved);
      alert(`localStorage content: ${saved || 'empty'}`);
    }
  };

  return (
    <div className="p-4 absolute w-80 right-60 top-40 z-50">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Socket.IO Status</h2>
        <div className={`p-2 rounded ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}>
          {isConnected ? 'Connected' : 'Disconnected'}
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="w-full p-2 border rounded text-black"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={!isConnected}
        >
          Send Message
        </button>
      </div>

      <div className="border rounded p-2">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold">Messages ({messages.length}):</h3>
          <div className="space-x-2">
            <button
              onClick={checkStorage}
              className="text-sm text-blue-500 hover:text-blue-600"
            >
              Check Storage
            </button>
            <button
              onClick={clearMessages}
              className="text-sm text-red-500 hover:text-red-600"
            >
              Clear Messages
            </button>
          </div>
        </div>
        <div className="space-y-2">
          {messages.map((msg, index) => (
            <div key={index} className="p-2 bg-gray-700 rounded">
              <div>{msg.message}</div>
              <div className="text-xs text-gray-400">
                {new Date(msg.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocketComponent;