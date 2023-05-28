import React from 'react';
//import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './styles/customers.css';
import './styles/addbox.css';
import SearchBox from './SearchBox';

const Customers = () => {
    const handleSearch = (query) => {
        console.log("Busqueda:", query);
    };

    return (
        <div className="customers-container">
            <div className="text">Clientes</div>
            <div className="options">
                <SearchBox onSearch={handleSearch} />
                <button class="add-box">
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                    <span class="text">Nueva cliente</span>
                </button>
            </div>
        </div>
    );
}

export default Customers;
