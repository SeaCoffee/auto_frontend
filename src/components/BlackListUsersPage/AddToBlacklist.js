import React, { useState } from 'react';
import axios from 'axios';

const AddToBlacklist = () => {
    const [userId, setUserId] = useState('');
    const [reason, setReason] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/users/blacklist/manage/', { user_id: userId, reason: reason });
            setMessage('User has been successfully added to the blacklist.');
        } catch (error) {
            setMessage('Failed to add user to blacklist.');
        }
    };

    return (
        <div>
            <h1>Add User to Blacklist</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    User ID:
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Reason for Blacklisting:
                    <input
                        type="text"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Add to Blacklist</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default AddToBlacklist;
