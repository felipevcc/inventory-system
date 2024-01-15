import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        let user = localStorage.getItem("user");
        let isAllowed = false;
        try {
            user = JSON.parse(user);
            if (user && (user.admin === true || id === user.id)) {
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
