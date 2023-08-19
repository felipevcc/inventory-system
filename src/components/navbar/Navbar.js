import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCaretDown, faUserGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleToggleOptions = () => {
        setIsOpen(!isOpen);
    };

    // Logout
    const navigate = useNavigate();
    function handleLogout (event) {
        event.preventDefault();
        // Actions to logout
        navigate('/login');
    };

    const textRef = useRef(null);
    const optionsRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                (textRef.current && !textRef.current.contains(event.target)) &&
                (optionsRef.current && !optionsRef.current.contains(event.target))
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className={`navbar-container ${isOpen ? 'open' : ''}`}>
            <div className="text" onClick={handleToggleOptions} ref={textRef}>
                <FontAwesomeIcon icon={faUser} className="icon" />
                <span className="username">Felipe Villamizar</span>
                <FontAwesomeIcon
                    icon={faCaretDown}
                    className={`arrow-icon ${isOpen ? 'open' : ''}`}
                />
            </div>
            {isOpen && (
                <div className="options" ref={optionsRef}>
                    <ul>
                        <li>
                            <Link>
                                <FontAwesomeIcon icon={faUserGear}  className="icon" />
                                <span className="nav-text">Perfil</span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={handleLogout}>
                                <FontAwesomeIcon icon={faRightFromBracket}  className="icon" />
                                <span className="nav-text">Cerrar sesión</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Navbar;
