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

    const [selectedProvider, setSelectedProvider] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleProviderSelect = (provider) => {
        setSelectedProvider(provider);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className="newItem-container">
            <div className="text">Nuevo Artículo</div>
            <div className="form-container">
                <form>
                    <div className="grid-form">
                        <div className="form-item">
                            <label htmlFor="name">Nombre</label>
                            <input className="input" type="text" id="name" maxLength="45" required />
                        </div>

                        <div className="two-together">
                            <div className="form-item">
                                <label htmlFor="stock">Stock</label>
                                <input className="input" type="number" min="0" id="stock" required />
                            </div>
                            <div className="form-item">
                                <label htmlFor="weight">Peso</label>
                                <input className="input" type="text" id="weight" maxLength="15" required />
                            </div>
                        </div>

                        <div className="form-item">
                            <label htmlFor="brand">Marca</label>
                            <input className="input" type="text" id="brand" maxLength="45" required />
                        </div>

                        <div className="two-together">
                            <div className="form-item">
                                <label htmlFor="purchasePrice">Precio compra</label>
                                <input className="input" type="number" id="purchasePrice" required />
                            </div>
                            <div className="form-item">
                                <label htmlFor="salePrice">Precio venta</label>
                                <input className="input" type="number" id="salePrice" required />
                            </div>
                        </div>

                        <SearchSelect
                            label="Proveedor"
                            placeholder="Buscar proveedor..."
                            onSelected={handleProviderSelect}
                            apiUrl={`${API}/api/v1/provider`}
                            optionsAttr="providers"
                        />
                        <SearchSelect
                            label="Categoría"
                            placeholder="Buscar categoría..."
                            onSelected={handleCategorySelect}
                            apiUrl={`${API}/api/v1/category`}
                            optionsAttr="categories"
                        />
                        <div className="form-item">
                            <label htmlFor="provider">Proveedor</label>
                            <select className="input" id="provider" required>
                                <option selected value="" disabled>Selecciona una opción</option>
                                <option value="1">Lenimp</option>
                                <option value="2">Propartes</option>
                                <option value="3">Esciclismo</option>
                            </select>
                        </div>

                        <div className="form-item">
                            <label htmlFor="category">Categoría</label>
                            <select className="input" id="category" required>
                                <option selected value="" disabled>Selecciona una opción</option>
                                <option value="1">Frenos</option>
                                <option value="2">Llantas</option>
                                <option value="3">Pachas</option>
                            </select>
                        </div>

                    </div>

                    <div className="button-container">
                        <button type="submit" className="btn">
                            Crear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewItem;
