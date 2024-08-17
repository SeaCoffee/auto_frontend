import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ActivateAccount = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('Loading...');

    useEffect(() => {
        axios.post('http://127.0.0.1:8000/auth/activate/' + token)
            .then(response => {
                setStatus('Account activated successfully! Redirecting to login...');
                // Redirect to login page after a short delay
                setTimeout(() => {
                    navigate('/login');
                }, 3000); // 3 seconds delay
            })
            .catch(error => {
                setStatus('Failed to activate account. The link may be expired or invalid.');
            });
    }, [token, navigate]);

    return (
        <div>
            <h1>Activation Status</h1>
            <p>{status}</p>
        </div>
    );
};

export default ActivateAccount;

