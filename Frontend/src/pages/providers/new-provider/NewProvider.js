import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userVerification from '../../../utils/userVerification';

const NewProvider = () => {
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
        <div className="newProvider-container">

            <div className="text">Nuevo Proveedor</div>
            <div className="form-container">
                <form>
                    <div className="grid-form">
                        <div className="form-item">
                            <label htmlFor="name">Nombre</label>
                            <input className="input" type="text" id="name" maxLength="45" required />
                        </div>

                        <div className="form-item">
                            <label htmlFor="tel">Teléfono</label>
                            <input className="input" type="text" id="tel" maxLength="20" required />
                        </div>

                        <div className="form-item">
                            <label htmlFor="email">Correo</label>
                            <input className="input" type="email" id="email" maxLength="100" required />
                        </div>
                    </div>

                    <div className="button-container">
                        <button type="submit" className="btn">
                            Crear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewProvider;
