import React from 'react';
//import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './styles/providers.css';
import './styles/addbox.css';
import SearchBox from './SearchBox';

const Providers = () => {
    const handleSearch = (query) => {
        console.log("Busqueda:", query);
    };

    return (
        <div className="providers-container">
            <div className="text">Proveedores</div>
            <div className="options">
                <SearchBox onSearch={handleSearch} />
                <button class="add-box">
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                    <span class="text">Nuevo proveedor</span>
                </button>
            </div>
        </div>
    );
}

export default Providers;
