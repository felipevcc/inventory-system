import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import userVerification from '../../../userVerification';

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Permission validation
    useEffect(() => {
        const userVer = userVerification();

        // Authentication verification
        if (!userVer.isAuthenticated) {
            localStorage.clear();
            navigate('/login');
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
        }
    }, [id, navigate]);

    return (
        <div className="editUser-container">

            <div className="text">Editar Usuario</div>

        </div>
    );
}

export default EditUser;
