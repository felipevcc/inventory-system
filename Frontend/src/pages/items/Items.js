import React from 'react';
//import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './items.css';
import '../../styles/addbox.css';
import SearchBox from '../../components/search-box/SearchBox';
import Pagination from '../../components/pagination/Pagination';
import { Link } from 'react-router-dom';

const Items = () => {
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
        <div className="items-container">

            <div className="text">Artículos</div>

            <div className="options">
                <SearchBox onSearch={handleSearch} />
                <Link to="/new-item" className="add-box">
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                    <span className="text">Nuevo artículo</span>
                </Link>
            </div>

            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NOMBRE</th>
                            <th>MARCA</th>
                            <th>STOCK</th>
                            <th>PRECIO-COMPRA</th>
                            <th>PRECIO-VENTA</th>
                            <th>PESO</th>
                            <th>PROVEEDOR</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>11111</td>
                            <td>Llanta coraza 27.5x2.0</td>
                            <td>Chaoyang</td>
                            <td>8</td>
                            <td>$30.000</td>
                            <td>$47.900</td>
                            <td>560g</td>
                            <td>Lenimp</td>
                            <td>
                                <Link to={`/edit-item/${11111}`}>
                                    <FontAwesomeIcon icon={faPen} className="pen-icon" />
                                </Link>
                                <FontAwesomeIcon icon={faTrashCan} className="trash-icon" onClick={() => handleDelete(11111)} />
                            </td>
                        </tr>
                        <tr>
                            <td>11112</td>
                            <td>Freno hidraulico M7100</td>
                            <td>Shimano</td>
                            <td>4</td>
                            <td>$750.000</td>
                            <td>$885.900</td>
                            <td>280g</td>
                            <td>Propartes</td>
                            <td>
                                <Link to={`/edit-item/${11112}`}>
                                    <FontAwesomeIcon icon={faPen} className="pen-icon" />
                                </Link>
                                <FontAwesomeIcon icon={faTrashCan} className="trash-icon" onClick={() => handleDelete(11112)} />
                            </td>
                        </tr>
                        <tr>
                            <td>11113</td>
                            <td>Pacha 9Vel Rel 11/42</td>
                            <td>Cassette</td>
                            <td>5</td>
                            <td>$69.900</td>
                            <td>$81.900</td>
                            <td>451g</td>
                            <td>Esciclismo</td>
                            <td>
                                <Link to={`/edit-item/${11113}`}>
                                    <FontAwesomeIcon icon={faPen} className="pen-icon" />
                                </Link>
                                <FontAwesomeIcon icon={faTrashCan} className="trash-icon" onClick={() => handleDelete(11113)} />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <Pagination />
            </div>

        </div>
    );
}

export default Items;
