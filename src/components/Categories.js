import React from 'react';
//import React, { useEffect, useState } from 'react';
import './styles/categories.css';
import SearchBox from './SearchBox';

const Categories = () => {
    const handleSearch = (query) => {
        console.log("Busqueda:", query);
    };

    return (
        <div className="categories-container">
            <div className="text">Categorías</div>
            <SearchBox onSearch={handleSearch} />
        </div>
    );
}

export default Categories;
