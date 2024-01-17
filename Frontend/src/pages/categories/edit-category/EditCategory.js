import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userVerification from '../../../utils/userVerification';

const EditCategory = () => {
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
        <div className="editCategory-container">

            <div className="text">Editar Categoría</div>

        </div>
    );
}

export default EditCategory;
