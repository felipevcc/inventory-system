import React from 'react';
//import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrashCan, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import './purchases.css';
import '../../styles/addbox.css';
import SearchBox from '../../components/search-box/SearchBox';
import Pagination from '../../components/pagination/Pagination';

const Purchases = () => {
    const handleSearch = (query) => {
        console.log("Busqueda:", query);
    };

    return (
        <div className="purchases-container">

            <div className="text">Compras</div>

            <div className="options">
                <SearchBox onSearch={handleSearch} />
                <button class="add-box">
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                    <span class="text">Nueva compra</span>
                </button>
            </div>

            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>FECHA</th>
                            <th>TOTAL</th>
                            <th>PROVEEDOR</th>
                            <th>USUARIO</th>
                            <th>DETALLES</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>27-05-2023</td>
                            <td>$89.900</td>
                            <td>Lenimp</td>
                            <td>Felipe Villamizar</td>
                            <td>
                                <FontAwesomeIcon icon={faShoppingBag} className="details-icon" />
                            </td>
                            <td>
                                <FontAwesomeIcon icon={faPen} className="pen-icon" />
                                <FontAwesomeIcon icon={faTrashCan} className="trash-icon" />
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>27-05-2023</td>
                            <td>$24.900</td>
                            <td>Propartes</td>
                            <td>Felipe Villamizar</td>
                            <td>
                                <FontAwesomeIcon icon={faShoppingBag} className="details-icon" />
                            </td>
                            <td>
                                <FontAwesomeIcon icon={faPen} className="pen-icon" />
                                <FontAwesomeIcon icon={faTrashCan} className="trash-icon" />
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>23-05-2023</td>
                            <td>$132.900</td>
                            <td>Esciclismo</td>
                            <td>Felipe Villamizar</td>
                            <td>
                                <FontAwesomeIcon icon={faShoppingBag} className="details-icon" />
                            </td>
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

export default Purchases;
