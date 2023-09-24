import React from 'react';
//import React, { useEffect, useState } from 'react';
import '../../../styles/new-form.css'

const NewItem = () => {

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
