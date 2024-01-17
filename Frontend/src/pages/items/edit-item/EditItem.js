import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userVerification from '../../../utils/userVerification';

const EditItem = () => {
    const navigate = useNavigate();

    // Permission validation
    useEffect(() => {
        if (!userVerification().isAuthenticated) {
            localStorage.clear();
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className="editItem-container">

            <div className="text">Editar Artículo</div>

        </div>
    );
}

export default EditItem;
