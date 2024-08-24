import React, { useState } from 'react';
import axios from 'axios';

const DeleteAccount = () => {
    const [message, setMessage] = useState('');

    const handleDelete = async () => {
        try {
            const response = await axios.delete('/api/users/delete-account/');
            setMessage('Your account has been deleted successfully.');
        } catch (error) {
            setMessage('Failed to delete your account.');
        }
    };

    return (
        <div>
            <button onClick={handleDelete}>Delete My Account</button>
            <p>{message}</p>
        </div>
    );
};

export default DeleteAccount;
