import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                console.log('Token decoded:', decodedToken);
                // Добавьте логику проверки токена, если нужно
            } catch (err) {
                console.error('Failed to decode token:', err);
                localStorage.removeItem('token'); // Удаляем невалидный токен
                navigate('/login');  // Перенаправляем на страницу логина
            }
        }
    }, [navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/auth/', { username, password });
            const { access } = response.data;
            localStorage.setItem('token', access);
            console.log('Token saved:', access); // Проверка сохранения токена
            // Очищаем поля формы
            setUsername('');
            setPassword('');
            // Перенаправляем на главную страницу или другую защищенную страницу
            navigate('/');
        } catch (err) {
            console.error('Login Error:', err.response || err.message);
            setError('Ошибка входа: ' + (err.response?.data?.detail || err.message));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Логин:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Пароль:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit">Войти</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default LogIn;