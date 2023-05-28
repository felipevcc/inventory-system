import React from 'react';
//import React, { useEffect, useState } from 'react';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faEye, faEyeSlash, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import './styles/users.css';
import SearchBox from './SearchBox';

const Users = () => {
    const handleSearch = (query) => {
        console.log("Busqueda:", query);
    };

    return (
        <div className="users-container">
            <div className="text">Usuarios</div>
            <SearchBox onSearch={handleSearch} />
        </div>
    );
}

export default Users;
