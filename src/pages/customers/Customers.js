import React from 'react';
//import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './customers.css';
import '../../styles/addbox.css';
import SearchBox from '../../components/search-box/SearchBox';
import Pagination from '../../components/pagination/Pagination';
import { Link } from 'react-router-dom';

const Customers = () => {
    const handleSearch = (query) => {
        console.log("Busqueda:", query);
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm(`¿Estás seguro de que quieres eliminar este registro?`);

        if (confirmDelete) {
            // Call to the api to delete the record by id, modify the state
            console.log(`Registro con ID ${id} eliminado`);
        }
    };

    return (
        <div className="customers-container">

            <div className="text">Clientes</div>

            <div className="options">
                <SearchBox onSearch={handleSearch} />
                <Link to="/new-customer" className="add-box">
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                    <span className="text">Nuevo cliente</span>
                </Link>
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
                                <Link to={`/edit-customer/${1092836746}`}>
                                    <FontAwesomeIcon icon={faPen} className="pen-icon" />
                                </Link>
                                <FontAwesomeIcon icon={faTrashCan} className="trash-icon" onClick={() => handleDelete(1092836746)} />
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
                                <Link to={`/edit-customer/${1108923874}`}>
                                    <FontAwesomeIcon icon={faPen} className="pen-icon" />
                                </Link>
                                <FontAwesomeIcon icon={faTrashCan} className="trash-icon" onClick={() => handleDelete(1108923874)} />
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
                                <Link to={`/edit-customer/${1110368918}`}>
                                    <FontAwesomeIcon icon={faPen} className="pen-icon" />
                                </Link>
                                <FontAwesomeIcon icon={faTrashCan} className="trash-icon" onClick={() => handleDelete(1110368918)} />
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
