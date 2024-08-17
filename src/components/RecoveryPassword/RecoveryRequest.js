import React, { useState } from 'react';
import axios from 'axios';

const PasswordRecoveryRequest = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/auth/recovery/', { email })
            .then(response => {
                setMessage('Check your email for the password reset link.');
            })
            .catch(error => {
                setMessage('Error sending password reset email.');
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Send Reset Email</button>
            <div>{message}</div>
        </form>
    );
};

export default PasswordRecoveryRequest;
