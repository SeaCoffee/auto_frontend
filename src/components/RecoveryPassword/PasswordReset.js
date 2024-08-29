import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PasswordReset = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`/api/auth/recovery/${token}`, { password })
            .then(response => {
                setMessage('Password has been reset successfully.');
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            })
            .catch(error => {
                setMessage('Failed to reset password.');
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="password">New Password:</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Reset Password</button>
            <div>{message}</div>
        </form>
    );
};

export default PasswordReset;
