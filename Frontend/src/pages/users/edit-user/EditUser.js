import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import userVerification from '../../../utils/userVerification';
import '../../../styles/new-edit-form.css';
import './edit-user.css';

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();

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

    return (
        <div className="editUser-container">

            <div className="text">Editar Usuario</div>
            <div className='editing-options'>
                <div className="grid-form">
                    <Link to={`/edit-user-data/${id}`} className='option'>
                        <span className="text">Editar datos</span>
                    </Link>

                    <Link to={`/edit-user-pass/${id}`} className='option'>
                        <span className="text">Editar contraseña</span>
                    </Link>
                </div>
            </div>

        </div>
    );
}

export default EditUser;
