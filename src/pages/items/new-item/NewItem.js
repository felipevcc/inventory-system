import React from 'react';
//import React, { useEffect, useState } from 'react';
import './new-item.css'

const NewItem = () => {

    return (
        <div className="newItem-container">
            <div className="text">Nuevo Artículo</div>
            <div className="form-container">
                <form>
                    <div className="grid-form">
                        <div className="form-item">
                            <label htmlFor="itemName">Nombre</label>
                            <input type="text" id="itemName" required />
                        </div>

                        <div className="right-column-top">
                            <div className="form-item">
                                <label htmlFor="itemStock">Stock</label>
                                <input type="number" min="0" id="itemStock" required />
                            </div>
                            <div className="form-item">
                                <label htmlFor="itemWeight">Peso</label>
                                <input type="text" id="itemWeight" required />
                            </div>
                        </div>

                        <div className="form-item">
                            <label htmlFor="itemBrand">Marca</label>
                            <input type="text" id="itemBrand" required />
                        </div>

                        <div className="right-column-bottom">
                            <div className="form-item">
                                <label htmlFor="itemPurchasePrice">Precio compra</label>
                                <input type="text" id="itemPurchasePrice" required />
                            </div>
                            <div className="form-item">
                                <label htmlFor="itemSalePrice">Precio venta</label>
                                <input type="text" id="itemSalePrice" required />
                            </div>
                        </div>

                        <div className="form-item">
                            <label htmlFor="itemProvider">Proveedor</label>
                            <input type="text" id="itemProvider" required />
                        </div>

                        <div className="form-item">
                            <label htmlFor="itemCategory">Categoría</label>
                            <input type="text" id="itemCategory" required />
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
