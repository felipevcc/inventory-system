import React from 'react';
//import React, { useEffect, useState } from 'react';
import '../../../styles/new-form.css'

const NewCustomer = () => {

    return (
        <div className="newCustomer-container">

            <div className="text">Nuevo Cliente</div>
            <div className="form-container">
                <form>
                    <div className="grid-form">
                        <div className="form-item">
                            <label htmlFor="name">Nombre</label>
                            <input className="input" type="text" id="name" maxLength="45" required />
                        </div>

                        <div className="form-item">
                            <label htmlFor="id">Cédula</label>
                            <input className="input" type="number" id="id" required />
                        </div>

                        <div className="form-item">
                            <label htmlFor="tel">Teléfono</label>
                            <input className="input" type="text" id="tel" maxLength="20" required />
                        </div>

                        <div className="form-item">
                            <label htmlFor="email">Correo</label>
                            <input className="input" type="email" id="email" maxLength="100" required />
                        </div>

                        <div className="two-together">
                            <div className="form-item">
                                <label htmlFor="state">Departamento</label>
                                <input className="input" type="text" id="state" maxLength="45" required />
                            </div>
                            <div className="form-item">
                                <label htmlFor="city">Ciudad</label>
                                <input className="input" type="text" id="city" maxLength="45" required />
                            </div>
                        </div>

                        <div className="form-item">
                            <label htmlFor="address">Dirección</label>
                            <input className="input" type="text" id="address" maxLength="100" required />
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

export default NewCustomer;
