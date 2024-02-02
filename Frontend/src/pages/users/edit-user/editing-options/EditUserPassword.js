import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import userVerification from '../../../../utils/userVerification';
import { API } from '../../../../env';
import '../../../../styles/new-edit-form.css';

const EditUserPassword = () => {
    localStorage.setItem('selectedView', 'users');
    const { id } = useParams();
    const navigate = useNavigate();

    const [submitDisabled, setSubmitDisabled] = useState(false);

    const [formData, setFormData] = useState({
        password: '',
        passwordConfirmation: ''
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
    }, [id, navigate]);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate password with confirmation
        if (formData.password !== formData.passwordConfirmation) {
            alert('Las contraseñas no coinciden');
            setFormData({
                password: '',
                passwordConfirmation: ''
            });
            return;
        }

        setSubmitDisabled(true);
        try {
            const response = await fetch(`${API}/api/v1/user/${id}/${formData.password}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Contraseña actualizada exitosamente');
                navigate(`/edit-user/${id}`);
                return;
            }
            alert("La contraseña no pudo ser actualizada");
            navigate(`/edit-user/${id}`);
            return;
        } catch (error) {
            console.log(error);
            alert("Error al actualizar la contraseña");
            navigate(`/edit-user/${id}`);
            return;
        }
    }

    return (
        <div className="editUserPassword-container">

            <div className="text">Editar Contraseña</div>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="grid-form">
                        <div className="form-item">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                className="input"
                                type="password"
                                id="password"
                                maxLength="15"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-item">
                            <label htmlFor="passwordConfirmation">Confirmar contraseña</label>
                            <input
                                className="input"
                                type="password"
                                id="passwordConfirmation"
                                maxLength="15"
                                value={formData.passwordConfirmation}
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
        </div>
    );
}

export default EditUserPassword;
