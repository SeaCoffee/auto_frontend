import React, { useState } from 'react';
import axios from 'axios';

const UpgradeAccount = () => {
    const [accountType, setAccountType] = useState('premium');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put('http://127.0.0.1:8000/users/upgrade_account/', { account_type: accountType });
            setMessage('Account upgraded successfully.');
        } catch (error) {
                setMessage(`Failed to upgrade account: ${error.response.data.detail}`);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
                    <option value="premium">Premium</option>
                </select>
                <button type="submit">Upgrade Account</button>
            </form>
            {message}
        </div>
    );
};

export default UpgradeAccount;
