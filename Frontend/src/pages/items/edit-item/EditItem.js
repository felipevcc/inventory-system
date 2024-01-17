import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userVerification from '../../../utils/userVerification';

const EditItem = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Permission validation
        if (!userVerification().isAuthenticated) {
            localStorage.clear();
            navigate('/login');
            return;
        }
    }, [navigate]);

    return (
        <div className="editItem-container">

            <div className="text">Editar Artículo</div>

        </div>
    );
}

export default EditItem;
