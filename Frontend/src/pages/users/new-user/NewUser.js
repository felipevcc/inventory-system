import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userVerification from '../../../utils/userVerification';

const NewUser = () => {
    const navigate = useNavigate();

    // Permission validation
    useEffect(() => {
        const userVer = userVerification();
        if (!userVer.isAuthenticated) {
            localStorage.clear();
            navigate('/login');
        } else if (!userVer.isAdmin) {
            navigate('/home');
        }
    }, [navigate]);

    return (
        <div className="newUser-container">

            <div className="text">Nuevo Usuario</div>
            <div className="form-container">
                <form>
                    <div className="grid-form">
                        <div className="form-item">
                            <label htmlFor="name">Nombre</label>
                            <input className="input" type="text" id="name" maxLength="45" required />
                        </div>

                        <div className="form-item">
                            <label htmlFor="nuser">Usuario</label>
                            <input className="input" type="text" maxLength="20" id="nuser" required />
                        </div>

                        <div className="form-item">
                            <label htmlFor="pass">Password</label>
                            <input className="input" type="password" id="pass" maxLength="15" required />
                        </div>

                        <div className="form-item">
                            <label htmlFor="tel">Teléfono</label>
                            <input className="input" type="text" id="tel" maxLength="20" required />
                        </div>

                        <div className="form-item">
                            <label htmlFor="email">Correo</label>
                            <input className="input" type="email" id="email" maxLength="100" required />
                        </div>

                        <div className="form-item">
                            <label htmlFor="admin">Administrador</label>
                            <select className="input" id="admin" required>
                                <option value="true">Si</option>
                                <option selected defaultValue="false">No</option>
                            </select>
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

export default NewUser;
