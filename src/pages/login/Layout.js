import React from 'react';
import logo from '../../assets/logo.png';
import wave from '../../assets/wave.png';
import loginBg from '../../assets/loginbg.svg';
import './login.css';

const LoginLayout = ({ children }) => {
    return (
        <div className="login-container">
            <link rel="icon" href={logo} />
            <img className="wave" src={wave} alt="background-wave" />
            <div className="container">
                <div className="img">
                    <img src={loginBg} alt="background-img" />
                </div>
                {children}
            </div>
        </div>
    );
};

export default LoginLayout;
