import React, { useState } from 'react';
import axios from 'axios';

const RemoveFromBlacklist = () => {
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState('');

    const handleRemove = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.delete('api/users/blacklist/manage/', { data: { user_id: userId } });
            setMessage('User removed from blacklist successfully');
        } catch (error) {
            setMessage('Error removing user from blacklist');
        }
    };

    return (
        <div>
            <form onSubmit={handleRemove}>
                <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User ID" />
                <button type="submit">Remove from Blacklist</button>
            </form>
            {message}
        </div>
    );
};

export default RemoveFromBlacklist;
