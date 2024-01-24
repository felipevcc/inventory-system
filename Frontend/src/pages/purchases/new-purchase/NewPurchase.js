import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import userVerification from '../../../utils/userVerification';
import '../../../styles/new-edit-form.css';
import { API } from '../../../env';
import './new-purchase.css';
import ItemSelection from './item-selection/ItemSelection';

const NewPurchase = () => {
    const { providerId } = useParams();
    const navigate = useNavigate();

    const [provider, setProvider] = useState(null);

    const [formData, setFormData] = useState({
        providerId: 0,
        articles: [],
        sessionUserId: 0
    });

    useEffect(() => {
        // Permission validation
        const userVer = userVerification();
        if (!userVer.isAuthenticated) {
            localStorage.clear();
            navigate('/login');
            return;
        }

        // Get provider by id
        (async () => {
            try {
                const response = await fetch(`${API}/api/v1/provider/${providerId}`);
                if (!response.ok) {
                    navigate('/new-purchase');
                    return;
                }
                const data = await response.json();
                setProvider(data);
                // Initialize form data
                setFormData({
                    ...formData,
                    providerId: providerId,
                    sessionUserId: userVer.user.userId
                });
            } catch (error) {
                console.log(error);
                navigate('/new-purchase');
                return;
            }
        })();
        // eslint-disable-next-line
    }, [navigate, providerId]);

    const onSelectionChange = (articles) => {
        setFormData({
            ...formData,
            articles: articles.map(a => ({articleId: a.articleId, articleQuantity: a.quantity}))
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formData.articles.length === 0) {
            alert('Debe seleccionar al menos un artículo');
            return;
        }
        try {
            const response = await fetch(`${API}/api/v1/purchase`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Compra registrada exitosamente');
                navigate('/purchases');
                return;
            }
            alert("La compra no pudo ser registrada, verifique los datos");
        } catch (error) {
            console.log(error);
            alert("Error al registrar la compra");
        }
    }

    return (
        <div className="newPurchase-container">

            <div className="text">Nueva Compra</div>
            <div className="form-container">
                <form onSubmit={handleSubmit}>

                    <ItemSelection onSelectionChange={onSelectionChange} provider={provider} />

                    <div className="button-container">
                        <button className="btn" type="submit">
                            Crear
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default NewPurchase;
