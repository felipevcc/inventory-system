import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrashCan, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import './sales.css';
import '../../styles/addbox.css';
import SearchBox from '../../components/search-box/SearchBox';
import Pagination from '../../components/pagination/Pagination';
import { Link, useNavigate } from 'react-router-dom';
import userVerification from '../../userVerification';

const Sales = () => {
    const navigate = useNavigate();

    // Permission validation
    useEffect(() => {
        if (!userVerification().isAuthenticated) {
            localStorage.clear();
            navigate('/login');
        }
    }, [navigate]);

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
        <div className="sales-container">

            <div className="text">Ventas</div>

            <div className="options">
                <SearchBox onSearch={handleSearch} />
                <Link to="/new-sale" className="add-box">
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                    <span className="text">Nueva venta</span>
                </Link>
            </div>

            <div className="table-container">
            <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>FECHA</th>
                            <th>CLIENTE</th>
                            <th>USUARIO</th>
                            <th>TOTAL</th>
                            <th>DETALLES</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>28-05-2023</td>
                            <td>Martín Perea</td>
                            <td>Felipe Villamizar</td>
                            <td>$129.900</td>
                            <td>
                                <Link to={`/detail-sale/${1}`}>
                                    <FontAwesomeIcon icon={faCartPlus} className="details-icon" />
                                </Link>
                            </td>
                            <td>
                                <Link to={`/edit-sale/${1}`}>
                                    <FontAwesomeIcon icon={faPen} className="pen-icon" />
                                </Link>
                                <FontAwesomeIcon icon={faTrashCan} className="trash-icon" onClick={() => handleDelete(1)} />
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>28-05-2023</td>
                            <td>Gustavo Rodriguez</td>
                            <td>Felipe Villamizar</td>
                            <td>$57.900</td>
                            <td>
                                <Link to={`/detail-sale/${2}`}>
                                    <FontAwesomeIcon icon={faCartPlus} className="details-icon" />
                                </Link>
                            </td>
                            <td>
                                <Link to={`/edit-sale/${2}`}>
                                    <FontAwesomeIcon icon={faPen} className="pen-icon" />
                                </Link>
                                <FontAwesomeIcon icon={faTrashCan} className="trash-icon" onClick={() => handleDelete(2)} />
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>25-05-2023</td>
                            <td>David Villa</td>
                            <td>Felipe Villamizar</td>
                            <td>$33.900</td>
                            <td>
                                <Link to={`/detail-sale/${3}`}>
                                    <FontAwesomeIcon icon={faCartPlus} className="details-icon" />
                                </Link>
                            </td>
                            <td>
                                <Link to={`/edit-sale/${3}`}>
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

export default Sales;
