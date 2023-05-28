import React from 'react';
//import React, { useEffect, useState } from 'react';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faEye, faEyeSlash, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import './styles/customers.css';
import SearchBox from './SearchBox';

const Customers = () => {
    const handleSearch = (query) => {
        console.log("Busqueda:", query);
    };

    return (
        <div className="customers-container">
            <div className="text">Clientes</div>
            <SearchBox onSearch={handleSearch} />
        </div>
    );
}

export default Customers;
