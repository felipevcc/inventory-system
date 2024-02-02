import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import userVerification from '../../../../utils/userVerification';
import { API } from '../../../../env';
import '../../../../styles/new-edit-form.css';
import trimFormValues from '../../../../utils/trimFormValues';
import Loading from '../../../../components/loading/Loading';

const EditUserData = () => {
    localStorage.setItem('selectedView', 'users');
    const { id } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [submitDisabled, setSubmitDisabled] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        phoneNumber: '',
        email: '',
        admin: false,
        sessionUserId: 0
    });

    useEffect(() => {
        // Permission validation
        const userVer = userVerification();

        // Authentication verification
        if (!userVer.isAuthenticated) {
            localStorage.clear();
            navigate('/login');
            return;
        }

        // Administrator role verification or same user updating himself
        let isAllowed = false;
        try {
            if (userVer.user && (userVer.user.admin === true || id === userVer.user.userId.toString())) {
                isAllowed = true;
            }
        } catch (error) {
            isAllowed = false;
        }
        if (!isAllowed) {
            navigate('/home');
            return;
        }

        // Query data
        (async () => {
            const url = new URL(`${API}/api/v1/user/${id}`);
            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (!data || data.error) {
                        navigate('/users');
                        return;
                    }
                    setFormData({
                        name: data.name,
                        username: data.username,
                        phoneNumber: data.phoneNumber,
                        email: data.email,
                        admin: data.admin,
                        sessionUserId: userVer.user.userId
                    });
                    setIsLoading(false);
                })
                .catch(error => {
                    console.log(error);
                    navigate('/users');
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
            const response = await fetch(`${API}/api/v1/user/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(trimmedFormData),
            });

            if (response.ok) {
                alert('Usuario actualizado exitosamente');
                navigate(`/edit-user/${id}`);
                return;
            }
            alert("El usuario no pudo ser actualizado, verifique los datos");
        } catch (error) {
            console.log(error);
            alert("Error al actualizar el usuario");
        }
        setSubmitDisabled(false);
    }

    return (
        <div className="editUserData-container">

            <div className="text">Editar Usuario</div>
            {!isLoading ? (
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
                                <label htmlFor="username">Usuario</label>
                                <input
                                    className="input"
                                    type="text"
                                    id="username"
                                    maxLength="20"
                                    value={formData.username}
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

                            {userVerification().isAdmin && (
                                <div className="form-item">
                                    <label htmlFor="admin">Administrador</label>
                                    <select
                                        className="input"
                                        id="admin"
                                        value={formData.admin}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value={true}>Sí</option>
                                        <option value={false}>No</option>
                                    </select>
                                </div>
                            )}
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

export default EditUserData;
