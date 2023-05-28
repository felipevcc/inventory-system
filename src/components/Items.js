import React from 'react';
//import React, { useEffect, useState } from 'react';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faEye, faEyeSlash, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import './styles/items.css';
import SearchBox from './SearchBox';

const Items = () => {
    const handleSearch = (query) => {
        console.log("Busqueda:", query);
    };

    return (
        <div className="items-container">
            <div className="text">Artículos</div>
            <SearchBox onSearch={handleSearch} />
        </div>
    );
}

export default Items;
