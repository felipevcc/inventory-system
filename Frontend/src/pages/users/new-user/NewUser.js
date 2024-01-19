import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userVerification from '../../../utils/userVerification';
import { API } from '../../../env';

const NewUser = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Permission validation
        const userVer = userVerification();
        if (!userVer.isAuthenticated) {
            localStorage.clear();
            navigate('/login');
            return;
        } else if (!userVer.isAdmin) {
            navigate('/home');
            return;
        }
    }, [navigate]);

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        phoneNumber: '',
        email: '',
        admin: false
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${API}/api/v1/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Usuario creado exitosamente');
                navigate('/users');
                return;
            }
            alert("El usuario no pudo ser creado, verifique los datos");
        } catch (error) {
            console.log(error);
            alert("Error al crear el usuario");
        }
    }

    return (
        <div className="newUser-container">

            <div className="text">Nuevo Usuario</div>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="grid-form">
                        <div className="form-item">
                            <label htmlFor="name">Nombre</label>
                            <input className="input" type="text" id="name" maxLength="45" required value={formData.name} onChange={handleChange} />
                        </div>

                        <div className="form-item">
                            <label htmlFor="nuser">Usuario</label>
                            <input className="input" type="text" maxLength="20" id="username" required value={formData.username} onChange={handleChange} />
                        </div>

                        <div className="form-item">
                            <label htmlFor="pass">Password</label>
                            <input className="input" type="password" id="password" maxLength="15" required value={formData.password} onChange={handleChange} />
                        </div>

                        <div className="form-item">
                            <label htmlFor="tel">Teléfono</label>
                            <input className="input" type="text" id="phoneNumber" maxLength="20" required value={formData.phoneNumber} onChange={handleChange} />
                        </div>

                        <div className="form-item">
                            <label htmlFor="email">Correo</label>
                            <input className="input" type="email" id="email" maxLength="100" required value={formData.email} onChange={handleChange} />
                        </div>

                        <div className="form-item">
                            <label htmlFor="admin">Administrador</label>
                            <select className="input" id="admin" required value={formData.admin} onChange={handleChange}>
                                <option value={true}>Si</option>
                                <option value={false}>No</option>
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
