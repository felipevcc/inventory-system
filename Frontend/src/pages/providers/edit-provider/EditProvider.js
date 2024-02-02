import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import userVerification from '../../../utils/userVerification';
import { API } from '../../../env';
import '../../../styles/new-edit-form.css';
import trimFormValues from '../../../utils/trimFormValues';
import Loading from '../../../components/loading/Loading';

const EditProvider = () => {
    localStorage.setItem('selectedView', 'providers');
    const { id } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [submitDisabled, setSubmitDisabled] = useState(false);

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
                .then(data => {
                    if (!data || data.error) {
                        navigate('/providers');
                        return;
                    }
                    setFormData({
                        phoneNumber: data.phoneNumber,
                        email: data.email
                    });
                    setIsLoading(false);
                })
                .catch(error => {
                    console.log(error);
                    navigate('/providers');
                    return;
                })
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

        const trimmedFormData = trimFormValues(formData);

        setSubmitDisabled(true);
        try {
            const response = await fetch(`${API}/api/v1/provider/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(trimmedFormData),
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
        setSubmitDisabled(false);
    }

    return (
        <div className="editProvider-container">

            <div className="text">Editar Proveedor</div>
            {!isLoading ? (
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
                            <button className="btn" type="submit" disabled={submitDisabled}>
                                Actualizar
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
}

export default EditProvider;
