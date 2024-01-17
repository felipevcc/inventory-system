import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userVerification from '../../../utils/userVerification';

const EditPurchase = () => {
    const navigate = useNavigate();

    // Permission validation
    useEffect(() => {
        if (!userVerification().isAuthenticated) {
            localStorage.clear();
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className="editPurchase-container">

            <div className="text">Editar Compra</div>

        </div>
    );
}

export default EditPurchase;
