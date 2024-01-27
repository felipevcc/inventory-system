import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userVerification from '../../utils/userVerification';

const NotFound = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Permission validation
        if (!userVerification().isAuthenticated) {
            localStorage.clear();
            navigate('/login');
            return;
        }

        // Return to home
        navigate('/home');
        return;
    }, [navigate]);

    return (
        <div></div>
    );
}

export default NotFound;
