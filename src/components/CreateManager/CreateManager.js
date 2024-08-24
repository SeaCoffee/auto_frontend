import React, { useState } from 'react';
import axios from 'axios';

const CreateManager = () => {
    const [managerData, setManagerData] = useState({ email: '', username: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setManagerData({ ...managerData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('api/create_manager/', managerData);
            setMessage('Manager created successfully.');
        } catch (error) {
            setMessage('Failed to create manager.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" value={managerData.email} onChange={handleChange} placeholder="Email" />
                <input type="text" name="username" value={managerData.username} onChange={handleChange} placeholder="Username" />
                <input type="password" name="password" value={managerData.password} onChange={handleChange} placeholder="Password" />
                <button type="submit">Create Manager</button>
            </form>
            {message}
        </div>
    );
};

export default CreateManager;
