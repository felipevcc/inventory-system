import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import avatar from '../../../assets/avatar.svg';
import '../login.css';
import LoginLayout from '../Layout';

const AccessValidation = () => {

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

  const [inputCode, setInputCode] = useState('');

  const navigate = useNavigate();
  function handleFormSubmit(event) {
      event.preventDefault();

      const AccessCode = localStorage.getItem('code');

      if (inputCode === AccessCode) {
          window.localStorage.clear();
          navigate('/home');
          setTimeout(() => {
              alert("Cambia la contraseña en ajustes de usuario");
          }, 0);
          return;
      }
      setInputCode('');
      alert("El código de acceso no coincide");
  }
  
  function handleInputChange(event) {
      setInputCode(event.target.value);
  }

  return (
      <LoginLayout>
          <div className="login-content">
              <form onSubmit={handleFormSubmit}>
                  <img src={avatar} alt="login-avatar" />
                  <h2 className="title">Recupera tu cuenta</h2>
                  <p>Introduce el código de acceso enviado a tu correo electrónico</p>
                  <div className="input-div one">
                      <div className="icon">
                          <FontAwesomeIcon icon={faUser} className="i" />
                      </div>
                      <div className="div">
                          <h5>Código de acceso</h5>
                          <input type="text" className="input" value={inputCode} onChange={handleInputChange} />
                      </div>
                  </div>
                  <button type="submit" className="btn">
                      Enviar
                  </button>
              </form>
          </div>
      </LoginLayout>
  );
}

export default AccessValidation;
