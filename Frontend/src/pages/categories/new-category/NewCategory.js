import React, { useEffect, useState } from 'react';
import '../../../styles/new-form.css'
import './new-category.css'
import { useNavigate } from 'react-router-dom';
import userVerification from '../../../utils/userVerification';
import { API } from '../../../env';

const NewCategory = () => {
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
        name: ''
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
            const response = await fetch(`${API}/api/v1/category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Categoría creada exitosamente');
                navigate('/users');
                return;
            }
            alert("La categoría no pudo ser creada, verifique los datos");
        } catch (error) {
            console.log(error);
            alert("Error al crear la categoría");
        }
    }

    return (
        <div className="newCategory-container">

            <div className="text">Nueva Categoría</div>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="grid-form">
                        <div className="form-item">
                            <label htmlFor="name">Nombre</label>
                            <input className="input" type="text" id="name" maxLength="45" required value={formData.name} onChange={handleChange} />
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

export default NewCategory;
