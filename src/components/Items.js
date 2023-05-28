import React from 'react';
//import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './styles/items.css';
import './styles/addbox.css';
import SearchBox from './SearchBox';

const Items = () => {
    const handleSearch = (query) => {
        console.log("Busqueda:", query);
    };

    return (
        <div className="items-container">
            <div className="text">Artículos</div>
            <div className="options">
                <SearchBox onSearch={handleSearch} />
                <button class="add-box">
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                    <span class="text">Nuevo artículo</span>
                </button>
            </div>
        </div>
    );
}

export default Items;
