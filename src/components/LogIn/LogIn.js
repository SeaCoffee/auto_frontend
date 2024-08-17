import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from "../../store/slices/UserSlice";



const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Использование хука useDispatch

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/auth/', { username, password });
            const { access } = response.data;
            const decodedToken = jwtDecode(access);

            // Сохранение данных пользователя в Redux store
            dispatch(setUser({
                user: { username }, // Вы можете добавить другие данные пользователя, если они вам доступны
                role: decodedToken.role,
                accountType: decodedToken.account_type
            }));

            localStorage.setItem('token', access);
            navigate('/'); // Перенаправление на главную страницу
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
