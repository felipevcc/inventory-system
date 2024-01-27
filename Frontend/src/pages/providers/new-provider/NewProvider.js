import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userVerification from '../../../utils/userVerification';
import { API } from '../../../env';
import '../../../styles/new-edit-form.css';
import trimFormValues from '../../../utils/trimFormValues';

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

    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        email: ''
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const trimmedFormData = trimFormValues(formData);

        try {
            const response = await fetch(`${API}/api/v1/provider`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(trimmedFormData),
            });

            if (response.ok) {
                alert('Proveedor creado exitosamente');
                navigate('/providers');
                return;
            }
            alert("El proveedor no pudo ser creado, verifique los datos");
        } catch (error) {
            console.log(error);
            alert("Error al crear el proveedor");
        }
    }

    return (
        <div className="newProvider-container">

            <div className="text">Nuevo Proveedor</div>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="grid-form">
                        <div className="form-item">
                            <label htmlFor="name">Nombre</label>
                            <input
                                className="input"
                                type="text"
                                id="name"
                                maxLength="45"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-item">
                            <label htmlFor="phoneNumber">Teléfono</label>
                            <input
                                className="input"
                                type="text"
                                id="phoneNumber"
                                maxLength="20"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-item">
                            <label htmlFor="email">Correo</label>
                            <input
                                className="input"
                                type="email"
                                id="email"
                                maxLength="100"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="button-container">
                        <button className="btn" type="submit">
                            Crear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewProvider;
