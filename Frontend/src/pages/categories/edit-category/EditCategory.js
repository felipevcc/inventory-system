import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import userVerification from '../../../utils/userVerification';
import '../../../styles/new-edit-form.css';
import './edit-category.css';
import { API } from '../../../env';
import trimFormValues from '../../../utils/trimFormValues';
import Loading from '../../../components/loading/Loading';

const EditCategory = () => {
    localStorage.setItem('selectedView', 'categories');
    const { id } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [submitDisabled, setSubmitDisabled] = useState(false);

    const [formData, setFormData] = useState({
        name: ''
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
            const url = new URL(`${API}/api/v1/category/${id}`);
            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (!data || data.error) {
                        navigate('/categories');
                        return;
                    }
                    setFormData({
                        name: data.name
                    });
                    setIsLoading(false);
                })
                .catch(error => {
                    console.log(error);
                    navigate('/categories');
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
            const response = await fetch(`${API}/api/v1/category/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(trimmedFormData),
            });

            if (response.ok) {
                alert('Categoría actualizada exitosamente');
                navigate('/categories');
                return;
            }
            alert("La categoría no pudo ser actualizada, verifique los datos");
        } catch (error) {
            console.log(error);
            alert("Error al actualizar la categoría");
        }
        setSubmitDisabled(false);
    }

    return (
        <div className="editCategory-container">

            <div className="text">Editar Categoría</div>
            {!isLoading ? (
                <div className='form-container'>
                    <form onSubmit={handleSubmit}>
                        <div className="grid-form">
                            <div className="form-item">
                                <label htmlFor="name">Nombre</label>
                                <input
                                    className='input'
                                    type="text"
                                    id="name"
                                    maxLength="45"
                                    value={formData.name}
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

export default EditCategory;
