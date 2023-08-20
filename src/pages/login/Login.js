import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import avatar from '../../assets/avatar.svg';
import './login.css';
import LoginLayout from './Layout';

const Login = () => {

    useEffect(() => {

        // Delete history in localStorage
        window.localStorage.clear();

        // Management of the focus on the inputs
        const inputs = document.querySelectorAll('.input');

        function addcl() {
            let parent = this.parentNode.parentNode;
            parent.classList.add('focus');
        }

        function remcl() {
            let parent = this.parentNode.parentNode;
            if (this.value === '') {
                parent.classList.remove('focus');
            }
        }

        inputs.forEach((input) => {
            input.addEventListener('focus', addcl);
            input.addEventListener('blur', remcl);
        });

        // Hide or show the eye icon when password input is not being used
        const toggleIcon = document.querySelector('.toggle-icon');
        const passwordInput = document.querySelector('.input[type="password"]');

        toggleIcon.style.display = 'none'; // Always hide on page load

        function handlePasswordInput() {
            if (passwordInput.value.length > 0) {
                toggleIcon.style.display = 'block';
            } else {
                toggleIcon.style.display = 'none';
            }
        }

        passwordInput.addEventListener('input', handlePasswordInput);

        return () => {
            // Remove event listeners
            inputs.forEach((input) => {
                input.removeEventListener('focus', addcl);
                input.removeEventListener('blur', remcl);
            });
            passwordInput.removeEventListener('input', handlePasswordInput);
        };
    }, []);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }
    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    // Show/hide password when the eye icon is clicked
    const [showPassword, setShowPassword] = useState(false);
    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }

    // Manage system login
    const navigate = useNavigate();
    function handleFormSubmit(event) {
        event.preventDefault();
        // Check login
        const username_db = "felipevillamizarc@gmail.com";
        const password_db = "1234";

        if (username === username_db && password === password_db) {
            // Delete history in localStorage
            window.localStorage.clear();
            // token
            navigate('/home');
            return;
        }
        // Clear username and password fields
        setUsername('');
        setPassword('');

        navigate('/');

        alert("Las credenciales no coinciden");
    }

    return (
        <LoginLayout>
            <div className="login-content">
                <form onSubmit={handleFormSubmit}>
                    <img src={avatar} alt="login-avatar" />
                    <h2 className="title">Inicia sesión</h2>
                    <div className="input-div one">
                        <div className="icon">
                            <FontAwesomeIcon icon={faUser} className="i" />
                        </div>
                        <div className="div">
                            <h5>Usuario</h5>
                            <input type="text" className="input" value={username} onChange={handleUsernameChange} required />
                        </div>
                    </div>
                    <div className="input-div pass">
                        <div className="icon">
                            <FontAwesomeIcon icon={faLock} className="i" />
                        </div>
                        <div className="div">
                            <h5>Contraseña</h5>
                            <input type={showPassword ? 'text' : 'password'} className="input" value={password} onChange={handlePasswordChange} required />
                            <div className="icon">
                                <FontAwesomeIcon
                                    icon={showPassword ? faEyeSlash : faEye}
                                    className="toggle-icon i"
                                    onClick={togglePasswordVisibility}
                                />
                            </div>
                        </div>
                    </div>
                    <Link to="/forgot-login">¿Olvidaste tu contraseña?</Link>
                    <button type="submit" className="btn">
                        Entrar
                    </button>
                </form>
            </div>
        </LoginLayout>
    );
}

export default Login;
