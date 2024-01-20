import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import userVerification from '../../../utils/userVerification';
import { API } from '../../../env';

const EditProvider = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        phoneNumber: '',
        email: ''
    });

    useEffect(() => {
        // Permission validation
        if (!userVerification().isAuthenticated) {
            localStorage.clear();
            navigate('/login');
            return;
        }

        // Query data
        (async () => {
            const url = new URL(`${API}/api/v1/provider/${id}`);
            await fetch(url)
                .then(response => response.json())
                .then(data => setFormData({
                    phoneNumber: data.phoneNumber,
                    email: data.email
                }))
                .catch(error => console.log(error))
        })();
    }, [id, navigate]);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${API}/api/v1/provider/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Proveedor actualizado exitosamente');
                navigate('/providers');
                return;
            }
            alert("El proveedor no pudo ser actualizado, verifique los datos");
        } catch (error) {
            console.log(error);
            alert("Error al actualizar el proveedor");
        }
    }

    return (
        <div className="editProvider-container">

            <div className="text">Editar Proveedor</div>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="grid-form">
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
                            Actualizar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProvider;
