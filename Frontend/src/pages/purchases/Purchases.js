import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrashCan, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import './purchases.css';
import '../../styles/addbox.css';
import SearchBox from '../../components/search-box/SearchBox';
import Pagination from '../../components/pagination/Pagination';
import { Link, useNavigate } from 'react-router-dom';
import userVerification from '../../utils/userVerification';
import { API } from '../../env';
import formatDate from '../../utils/formatDate';

const Purchases = () => {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const [paginator, setPaginator] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        // Permission validation
        if (!userVerification().isAuthenticated) {
            localStorage.clear();
            navigate('/login');
            return;
        }

        // Query paginated data
        const data = new FormData();
        if (query.length > 0) {
            data.append('searchCriteria', query);
        }
        data.append('page', page);
        data.append('pageSize', pageSize);

        const url = new URL(`${API}/api/v1/purchase`);
        url.search = new URLSearchParams(data).toString();
        (async () => {
            await fetch(url)
                .then(response => response.json())
                .then(data => setPaginator(data))
                .catch(error => console.log(error))
        })();
    }, [navigate, query, page]);

    const handleSearch = (query) => {
        console.log("Busqueda:", query);
        setQuery(query);
    }

    const handlePage = (page) => {
        setPage(page);
    }

    const handleDelete = (id) => {
        const confirmDelete = window.confirm(`¿Estás seguro de que quieres eliminar este registro?`);

        if (confirmDelete) {
            // Call to the api to delete the record by id, modify the state
            console.log(`Registro con ID ${id} eliminado`);
        }
    }

    return (
        <div className="purchases-container">

            <div className="text">Compras</div>

            <div className="options">
                <SearchBox onSearch={handleSearch} />
                <Link to="/new-purchase" className="add-box">
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                    <span className="text">Nueva compra</span>
                </Link>
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
                        {paginator.purchases && paginator.purchases.map(purchase => (
                            <tr key={purchase.purchaseId}>
                                <td>{purchase.purchaseId}</td>
                                <td>{formatDate(purchase.createdAt)}</td>
                                <td>{purchase.totalValue}</td>
                                <td>{purchase.provider.name}</td>
                                <td>{purchase.user.name}</td>
                                <td>
                                    <Link to={`/detail-purchase/${purchase.purchaseId}`}>
                                        <FontAwesomeIcon icon={faShoppingBag} className="details-icon" />
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/edit-purchase/${purchase.purchaseId}`}>
                                        <FontAwesomeIcon icon={faPen} className="pen-icon" />
                                    </Link>
                                    <FontAwesomeIcon icon={faTrashCan} className="trash-icon" onClick={() => handleDelete(purchase.purchaseId)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Pagination paginator={paginator} onChangePage={handlePage} />
            </div>

        </div>
    );
}

export default Purchases;
