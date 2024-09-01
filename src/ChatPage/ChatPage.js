import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ChatPage = () => {
  const { listingId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const connectToSocket = async () => {
      try {
        const socketToken = await axios.get('/api/auth/soket/');
        if (socketToken) {
          const newSocket = new WebSocket(`ws://localhost/api/chat/${listingId}/?token=${socketToken.data.token}`);

          newSocket.onmessage = (event) => {
            const messageData = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, messageData]);
          };

          newSocket.onopen = () => {
            console.log('WebSocket соединение установлено');
          };

          newSocket.onclose = () => {
            console.log('WebSocket соединение закрыто');
          };

          setSocket(newSocket);
        }
      } catch (error) {
        console.error('Failed to connect to WebSocket:', error);
      }
    };

    connectToSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [listingId]);

  const sendMessage = () => {
    if (socket && newMessage.trim()) {
        console.log("Отправка сообщения:", newMessage);  // Добавляем отладку здесь
        socket.send(JSON.stringify({
            action: 'send_message',
            data: newMessage,
            request_id: listingId,
        }));
        setMessages((prevMessages) => [...prevMessages, { message: newMessage, user: 'You' }]);
        setNewMessage('');
    }
};

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.user}: {msg.message}</div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatPage
