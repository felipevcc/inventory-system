import React from 'react';
//import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './providers.css';
import '../../styles/addbox.css';
import SearchBox from '../../components/search-box/SearchBox';
import Pagination from '../../components/pagination/Pagination';
import { Link } from 'react-router-dom';

const Providers = () => {
    const handleSearch = (query) => {
        console.log("Busqueda:", query);
    };

    return (
        <div className="providers-container">

            <div className="text">Proveedores</div>

            <div className="options">
                <SearchBox onSearch={handleSearch} />
                <Link to="/new-provider" class="add-box">
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                    <span class="text">Nuevo proveedor</span>
                </Link>
            </div>

            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NOMBRE</th>
                            <th>TELÉFONO</th>
                            <th>EMAIL</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Lenimp</td>
                            <td>+57 76712222 </td>
                            <td>servicioalcliente@lenimp.com</td>
                            <td>
                                <Link to={`/edit-provider/${1}`}>
                                    <FontAwesomeIcon icon={faPen} className="pen-icon" />
                                </Link>
                                <FontAwesomeIcon icon={faTrashCan} className="trash-icon" />
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Propartes</td>
                            <td>3187522969</td>
                            <td>serviciocliente.bicicletas@propartes.com</td>
                            <td>
                                <Link to={`/edit-provider/${2}`}>
                                    <FontAwesomeIcon icon={faPen} className="pen-icon" />
                                </Link>
                                <FontAwesomeIcon icon={faTrashCan} className="trash-icon" />
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Esciclismo</td>
                            <td>3206386489</td>
                            <td>info@esciclismo.com</td>
                            <td>
                                <Link to={`/edit-provider/${3}`}>
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

export default Providers;
