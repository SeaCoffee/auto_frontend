import io from 'socket.io-client';

const socketBaseURL = 'ws://localhost/api';

// Функция для создания экземпляра сокета с токеном
const createSocketService = () => {
  const token = localStorage.getItem('token'); // Получаем токен из localStorage

  // Настройка параметров соединения
  const options = {
    query: {
      token: token // Добавляем токен как параметр запроса
    },
    transports: ['websocket'] // Указываем, что используем только WebSocket (не polling)
  };

  // Создание сокета с нашими параметрами
  const socket = io(socketBaseURL, options);

  // Обработка подключения
  socket.on('connect', () => {
    console.log('WebSocket connected with token:', token);
  });

  // Обработка ошибки подключения (например, если токен недействителен)
  socket.on('connect_error', (err) => {
    console.error('Connection error:', err);
  });

  return socket;
};

export default createSocketService;
