import React, { useEffect, useState } from 'react';
import '../../../styles/new-form.css'
import { useNavigate } from 'react-router-dom';
import userVerification from '../../../utils/userVerification';
import { API } from '../../../env';
import SearchSelect from '../../../components/search-select/SearchSelect';

const NewItem = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Permission validation
        if (!userVerification().isAuthenticated) {
            localStorage.clear();
            navigate('/login');
            return;
        }
    }, [navigate]);

    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        stock: 0,
        purchasePrice: 0,
        salePrice: 0,
        weight: '',
        providerId: 0,
        categoryId: 0
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${API}/api/v1/article`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Artículo creado exitosamente');
                navigate('/items');
                return;
            }
            alert("El artículo no pudo ser creado, verifique los datos");
        } catch (error) {
            console.log(error);
            alert("Error al crear el artículo");
        }
    }

    const handleProviderSelect = (provider) => {
        setFormData({
            ...formData,
            providerId: provider.providerId
        });
    }

    const handleCategorySelect = (category) => {
        setFormData({
            ...formData,
            categoryId: category.categoryId
        });
    }

    return (
        <div className="newItem-container">
            <div className="text">Nuevo Artículo</div>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="grid-form">
                        <div className="form-item">
                            <label htmlFor="name">Nombre</label>
                            <input
                                className="input"
                                type="text"
                                id="name"
                                maxLength="45"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="two-together">
                            <div className="form-item">
                                <label htmlFor="stock">Stock</label>
                                <input 
                                    className="input"
                                    type="number"
                                    id="stock"
                                    min="0"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-item">
                                <label htmlFor="weight">Peso</label>
                                <input
                                    className="input"
                                    type="text"
                                    id="weight"
                                    maxLength="15"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-item">
                            <label htmlFor="brand">Marca</label>
                            <input
                                className="input"
                                type="text"
                                id="brand"
                                maxLength="45"
                                value={formData.brand}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="two-together">
                            <div className="form-item">
                                <label htmlFor="purchasePrice">Precio compra</label>
                                <input
                                    className="input"
                                    type="number"
                                    id="purchasePrice"
                                    min="0"
                                    value={formData.purchasePrice}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-item">
                                <label htmlFor="salePrice">Precio venta</label>
                                <input
                                    className="input"
                                    type="number"
                                    id="salePrice"
                                    min="0"
                                    value={formData.salePrice}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <SearchSelect
                            label="Proveedor"
                            placeholder="Buscar proveedor..."
                            onSelected={handleProviderSelect}
                            apiUrl={`${API}/api/v1/provider`}
                            optionsAttr="providers"
                            isRequired={true}
                        />

                        <SearchSelect
                            label="Categoría"
                            placeholder="Buscar categoría..."
                            onSelected={handleCategorySelect}
                            apiUrl={`${API}/api/v1/category`}
                            optionsAttr="categories"
                            isRequired={true}
                        />
                    </div>

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

export default NewItem;
