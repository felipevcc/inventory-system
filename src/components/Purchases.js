import React from 'react';
//import React, { useEffect, useState } from 'react';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faEye, faEyeSlash, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import './styles/purchases.css';
import SearchBox from './SearchBox';

const Purchases = () => {
    const handleSearch = (query) => {
        console.log("Busqueda:", query);
    };

    return (
        <div className="purchases-container">
            <div className="text">Compras</div>
            <SearchBox onSearch={handleSearch} />
        </div>
    );
}

export default Purchases;
