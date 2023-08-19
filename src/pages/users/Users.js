import React from 'react';
//import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './users.css';
import '../../styles/addbox.css';
import SearchBox from '../../components/search-box/SearchBox';
import Pagination from '../../components/pagination/Pagination';
import { Link } from 'react-router-dom';

const Users = () => {
    const handleSearch = (query) => {
        console.log("Busqueda:", query);
    };

    return (
        <div className="users-container">

            <div className="text">Usuarios</div>

            <div className="options">
                <SearchBox onSearch={handleSearch} />
                <Link to="/new-user" class="add-box">
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                    <span class="text">Nuevo usuario</span>
                </Link>
            </div>

            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NOMBRE</th>
                            <th>USUARIO</th>
                            <th>TELÉFONO</th>
                            <th>EMAIL</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Pedro Pablo</td>
                            <td>pedropablo</td>
                            <td>3208561452</td>
                            <td>pedropablov@gmail.com</td>
                            <td>
                                <Link to={`/edit-user/${1}`}>
                                    <FontAwesomeIcon icon={faPen} className="pen-icon" />
                                </Link>
                                <FontAwesomeIcon icon={faTrashCan} className="trash-icon" />
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Felipe Villamizar</td>
                            <td>felipevc</td>
                            <td>3148933577</td>
                            <td>felipevillamizarc@gmail.com</td>
                            <td>
                                <Link to={`/edit-user/${2}`}>
                                    <FontAwesomeIcon icon={faPen} className="pen-icon" />
                                </Link>
                                <FontAwesomeIcon icon={faTrashCan} className="trash-icon" />
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Natalia Villa</td>
                            <td>natavilla</td>
                            <td>3167596261</td>
                            <td>natavilla06@gmail.com</td>
                            <td>
                                <Link to={`/edit-user/${3}`}>
                                    <FontAwesomeIcon icon={faPen} className="pen-icon" />
                                </Link>
                                <FontAwesomeIcon icon={faTrashCan} className="trash-icon" />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <Pagination />
            </div>

        </div>
    );
}

export default Users;
