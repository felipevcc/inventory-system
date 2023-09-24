import React from 'react';
//import React, { useEffect, useState } from 'react';
import '../../../styles/new-form.css'
import './new-category.css'

const NewCategory = () => {

    return (
        <div className="newCategory-container">

            <div className="text">Nueva Categoría</div>
            <div className="form-container">
                <form>
                    <div className="grid-form">
                        <div className="form-item">
                            <label htmlFor="name">Nombre</label>
                            <input className="input" type="text" id="name" maxLength="45" required />
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

export default NewCategory;
