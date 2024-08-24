import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileDetail = () => {
    const [profile, setProfile] = useState(null); // Начальное состояние — null
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/api/users/profile/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data && Object.keys(response.data).length > 0) {
                    setProfile(response.data);
                } else {
                    setError('Profile data is empty.');
                }
            } catch (err) {
                console.error(err);
                if (err.response && err.response.status === 404) {
                    setError('Profile not found. Please complete your profile.');
                } else {
                    setError('Failed to fetch profile. ' + err.message);
                }
            }
        };

        fetchProfile();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!profile) {
        return <div>Loading profile...</div>;
    }

    return (
        <div>
            <h1>User Profile</h1>
            {profile.avatar ? (
                <img
                    src={profile.avatar}
                    alt={`${profile.name || 'User'}'s avatar`}
                    style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                />
            ) : (
                <p>No avatar available</p>
            )}
            <p>Name: {profile.name ? profile.name : 'Name not provided'}</p>
            <p>Email: {profile.email ? profile.email : 'Email not provided'}</p>
            <p>Account Type: {profile.account_type ? profile.account_type : 'Account type not provided'}</p>
        </div>
    );
};


export default ProfileDetail;
