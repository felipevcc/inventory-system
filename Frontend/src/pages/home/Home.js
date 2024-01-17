import React, { useEffect } from 'react';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faEye, faEyeSlash, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import './home.css';
import { useNavigate } from 'react-router-dom';
import userVerification from '../../utils/userVerification';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Permission validation
        if (!userVerification().isAuthenticated) {
            localStorage.clear();
            navigate('/login');
            return;
        }
    }, [navigate]);

    return (
        <div className="home-container">
            <div className="text">Dashboard</div>
        </div>
    );
}

export default Home;
