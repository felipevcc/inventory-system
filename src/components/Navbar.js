import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './styles/navbar.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="text">
                <FontAwesomeIcon icon={faUser} className="icon" />
                <span className="username">Felipe Villamizar</span>
            </div>
        </div>
    );
}

export default Navbar;
