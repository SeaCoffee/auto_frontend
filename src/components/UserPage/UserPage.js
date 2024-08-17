import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserProfile from './UserProfile';
import UserStats from './UserStats';

const UserPage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/profile/');
                setUser(response.data);
            } catch (err) {
                setError('Failed to fetch user data.');
            }
        };

        fetchUserData();
    }, []);

    return (
        <div>
            {error ? <p>{error}</p> : (
                <div>
                    {user && (
                        <>
                            <UserProfile user={user} />
                            {user.account_type === 'premium' && <UserStats userId={user.id} />}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserPage;
