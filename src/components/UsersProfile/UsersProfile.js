import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileDetail = () => {
    const [profile, setProfile] = useState(null); // Изменено на null для начального состояния
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:8000/users/profile/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // Проверяем, получены ли данные профиля
                if (response.data && Object.keys(response.data).length > 0) {
                    setProfile(response.data);
                } else {
                    // Добавлено условие для случая, когда профиль существует, но пуст
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
            <p>Name: {profile.name}</p>
            <p>Email: {profile.email}</p>
            <p>Account Type: {profile.account_type}</p>
        </div>
    );
};



export default ProfileDetail;
