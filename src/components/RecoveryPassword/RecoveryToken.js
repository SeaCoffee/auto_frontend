import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PasswordReset = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`api/auth/recovery/${token}`, { password })
            .then(response => {
                setMessage('Password has been reset successfully.');
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
