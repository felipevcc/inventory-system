import React from 'react';
//import React, { useEffect, useState } from 'react';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faEye, faEyeSlash, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import './styles/sales.css';
import SearchBox from './SearchBox';

const Sales = () => {
    const handleSearch = (query) => {
        console.log("Busqueda:", query);
    };

    return (
        <div className="sales-container">
            <div className="text">Ventas</div>
            <SearchBox onSearch={handleSearch} />
        </div>
    );
}

export default Sales;
