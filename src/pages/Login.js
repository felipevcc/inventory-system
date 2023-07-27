import React from 'react';
import logo from '../img/logo.png';
import wave from '../img/wave.png';
import loginBg from '../img/loginbg.svg';
import '../styles/login.css';
import LoginForm from './LoginForm';

const Login = () => {
    return (
        <div className="login-container">
            <link rel="icon" href={logo} />

            <img className="wave" src={wave} alt="background-wave" />
            <div className="container">
                <div className="img">
                    <img src={loginBg} alt="background-img" />
                </div>
                <LoginForm />
            </div>
        </div>
    );
}

export default Login;
