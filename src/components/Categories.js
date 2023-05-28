import React from 'react';
//import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './styles/categories.css';
import './styles/addbox.css';
import SearchBox from './SearchBox';

const Categories = () => {
    const handleSearch = (query) => {
        console.log("Busqueda:", query);
    };

    return (
        <div className="categories-container">
            <div className="text">Categorías</div>
            <div className="options">
                <SearchBox onSearch={handleSearch} />
                <button class="add-box">
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                    <span class="text">Nueva categoría</span>
                </button>
            </div>
        </div>
    );
}

export default Categories;
