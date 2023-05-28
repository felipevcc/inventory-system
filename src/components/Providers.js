import React from 'react';
//import React, { useEffect, useState } from 'react';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faEye, faEyeSlash, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import './styles/providers.css';
import SearchBox from './SearchBox';

const Providers = () => {
    const handleSearch = (query) => {
        console.log("Busqueda:", query);
    };

    return (
        <div className="providers-container">
            <div className="text">Proveedores</div>
            <SearchBox onSearch={handleSearch} />
        </div>
    );
}

export default Providers;
