import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userVerification from '../../../utils/userVerification';
import '../../../styles/new-edit-form.css'
import { API } from '../../../env';
import SearchSelect from '../../../components/search-select/SearchSelect';
import './new-sale.css';
import ItemSelection from '../../../components/item-selection/ItemSelection';

const NewSale = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        customerId: 0,
        articles: [],
        sessionUserId: 0
    });

    useEffect(() => {
        // Permission validation
        if (!userVerification().isAuthenticated) {
            localStorage.clear();
            navigate('/login');
            return;
        }
    }, [navigate]);

    const handleCustomerSelect = (customer) => {
        setFormData({
            ...formData,
            customerId: customer.customerId
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
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
                <form>
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

                    <ItemSelection />

                    <div className="button-container">
                        <button className="btn" type="button" onClick={handleSubmit}>
                            Crear
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default NewSale;
