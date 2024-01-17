import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userVerification from '../../../utils/userVerification';

const EditSale = () => {
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
        <div className="editSale-container">

            <div className="text">Editar Venta</div>

        </div>
    );
}

export default EditSale;
