import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import avatar from '../img/avatar.svg';
import '../styles/login.css';
import BackgroundLogin from '../components/BackgroundLogin';

const ForgotLogin = () => {

    useEffect(() => {

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

        return () => {
            // Remove event listeners
            inputs.forEach((input) => {
                input.removeEventListener('focus', addcl);
                input.removeEventListener('blur', remcl);
            });
        };
    }, []);

    // Manage system login
    //const [username, setUsername] = useState('');
    //const [password, setPassword] = useState('');
    const navigate = useNavigate();
    function handleFormSubmit(event) {
        event.preventDefault();
        // Check user
        // Send code
        // Navigate to checkCode view

        // Delete history in localStorage
        window.localStorage.clear();
        navigate('/home');
    }

    return (
        <BackgroundLogin>
            <div className="login-content">
                <form onSubmit={handleFormSubmit}>
                    <img src={avatar} alt="login-avatar" />
                    <h2 className="title">Encuentra tu usuario</h2>
                    <p>Introduce el correo electrónico, el número de teléfono o el nombre de usuario asociados a tu cuenta para cambiar tu contraseña.</p>
                    <div className="input-div one">
                        <div className="icon">
                            <FontAwesomeIcon icon={faUser} className="i" />
                        </div>
                        <div className="div">
                            <h5>Correo electrónico, teléfono o usuario</h5>
                            <input type="text" className="input" />
                        </div>
                    </div>
                    <button type="submit" className="btn">
                        Siguiente
                    </button>
                </form>
            </div>
        </BackgroundLogin>
    );
}

export default ForgotLogin;
