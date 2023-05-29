import React from 'react';
//import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './styles/customers.css';
import './styles/addbox.css';
import SearchBox from './SearchBox';
import Pagination from './Pagination';

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

            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>CÉDULA</th>
                            <th>NOMBRE</th>
                            <th>TELÉFONO</th>
                            <th>EMAIL</th>
                            <th>DIRECCIÓN</th>
                            <th>DEPARTAMENTO</th>
                            <th>CIUDAD</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1092836746</td>
                            <td>Martín Perea</td>
                            <td>3147283498</td>
                            <td>martinperea05@hotmail.com</td>
                            <td>Carrera 80B #55-32</td>
                            <td>Cundinamarca</td>
                            <td>Bogotá</td>
                            <td>
                                <FontAwesomeIcon icon={faPen} className="pen-icon" />
                                <FontAwesomeIcon icon={faTrashCan} className="trash-icon" />
                            </td>
                        </tr>
                        <tr>
                            <td>1108923874</td>
                            <td>Gustavo Rodriguez</td>
                            <td>3208273464</td>
                            <td>gustavorod@gmail.com</td>
                            <td>Calle 13A #39-51</td>
                            <td>Valle</td>
                            <td>Cali</td>
                            <td>
                                <FontAwesomeIcon icon={faPen} className="pen-icon" />
                                <FontAwesomeIcon icon={faTrashCan} className="trash-icon" />
                            </td>
                        </tr>
                        <tr>
                            <td>1110368918</td>
                            <td>David Villa</td>
                            <td>3167623542</td>
                            <td>davidvilla7@gmail.com</td>
                            <td>Avenida 6N #24-38</td>
                            <td>Antioquia</td>
                            <td>Medellín</td>
                            <td>
                                <FontAwesomeIcon icon={faPen} className="pen-icon" />
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

export default Customers;
