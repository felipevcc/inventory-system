import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userVerification from '../../../utils/userVerification';
import '../../../styles/new-edit-form.css';
import { API } from '../../../env';
import SearchSelect from '../../../components/search-select/SearchSelect';
import './new-sale.css';
import ItemSelection from './item-selection/ItemSelection';

const NewSale = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        customerId: 0,
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

        // Initialize form data
        setFormData({
            ...formData,
            sessionUserId: userVer.user.userId
        });
        // eslint-disable-next-line
    }, [navigate]);

    const handleCustomerSelect = (customer) => {
        setFormData({
            ...formData,
            customerId: customer.customerId
        });
    }

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
            const response = await fetch(`${API}/api/v1/sale`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Venta registrada exitosamente');
                navigate('/sales');
                return;
            }
            alert("La venta no pudo ser registrada, verifique los datos");
        } catch (error) {
            console.log(error);
            alert("Error al registrar la venta");
        }
    }

    return (
        <div className="newSale-container">

            <div className="text">Nueva Venta</div>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="grid-form">
                        <SearchSelect
                            label="Cliente"
                            placeholder="Buscar cliente..."
                            onSelected={handleCustomerSelect}
                            apiUrl={`${API}/api/v1/customer`}
                            optionsAttr="customers"
                            isRequired={true}
                        />
                    </div>

                    <ItemSelection onSelectionChange={onSelectionChange} />

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

export default NewSale;
