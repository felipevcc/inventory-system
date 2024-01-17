import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userVerification from '../../../utils/userVerification';

const DetailSale = () => {
    const navigate = useNavigate();

    // Permission validation
    useEffect(() => {
        if (!userVerification().isAuthenticated) {
            localStorage.clear();
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className="detailSale-container">

            <div className="text">Detalle Venta</div>

        </div>
    );
}

export default DetailSale;
