import React from 'react';
//import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './categories.css';
import '../../styles/addbox.css';
import SearchBox from '../../components/search-box/SearchBox';
import Pagination from '../../components/pagination/Pagination';
import { Link } from 'react-router-dom';

const Categories = () => {
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
        <div className="categories-container">

            <div className="text">Categorías</div>

            <div className="options">
                <SearchBox onSearch={handleSearch} />
                <Link to="/new-category" className="add-box">
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                    <span className="text">Nueva categoría</span>
                </Link>
            </div>

            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NOMBRE</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Frenos</td>
                            <td>
                                <Link to={`/edit-category/${1}`}>
                                    <FontAwesomeIcon icon={faPen} className="pen-icon" />
                                </Link>
                                <FontAwesomeIcon icon={faTrashCan} className="trash-icon" onClick={() => handleDelete(1)} />
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Llantas</td>
                            <td>
                                <Link to={`/edit-category/${2}`}>
                                    <FontAwesomeIcon icon={faPen} className="pen-icon" />
                                </Link>
                                <FontAwesomeIcon icon={faTrashCan} className="trash-icon" onClick={() => handleDelete(2)} />
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Pachas</td>
                            <td>
                                <Link to={`/edit-category/${3}`}>
                                    <FontAwesomeIcon icon={faPen} className="pen-icon" />
                                </Link>
                                <FontAwesomeIcon icon={faTrashCan} className="trash-icon" onClick={() => handleDelete(3)} />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <Pagination />
            </div>


        </div>
    );
}

export default Categories;
