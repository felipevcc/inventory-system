import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import './purchases.css';
import '../../styles/addbox.css';
import SearchBox from '../../components/search-box/SearchBox';
import Pagination from '../../components/pagination/Pagination';
import { Link, useNavigate } from 'react-router-dom';
import userVerification from '../../utils/userVerification';
import { API } from '../../env';
import formatDate from '../../utils/formatDate';
import Loading from '../../components/loading/Loading';

const Purchases = () => {
    localStorage.setItem('selectedView', 'purchases');
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const [isLoading, setIsLoading] = useState(true);

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
                .then(data => {
                    setPaginator(data);
                    setIsLoading(false);
                })
                .catch(error => console.log(error))
        })();
    }, [navigate, query, page]);

    const handleSearch = (query) => {
        setQuery(query);
    }

    const handlePage = (page) => {
        setPage(page);
    }

    return (
        <div className="purchases-container">

            <div className="text">Compras</div>

            <div className="options">
                <SearchBox onSearch={handleSearch} disabled={isLoading} />
                <Link to="/new-purchase" className="add-box">
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                    <span className="text">Nueva compra</span>
                </Link>
            </div>

            {!isLoading ? (
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
                            </tr>
                        </thead>
                        <tbody>
                            {paginator.purchases && paginator.purchases.length > 0 ? (
                                paginator.purchases.map(purchase => (
                                    <tr key={purchase.purchaseId}>
                                        <td>{purchase.purchaseId}</td>
                                        <td>{formatDate(purchase.createdAt)}</td>
                                        <td>{purchase.totalValue.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                                        <td>{purchase.provider.name}</td>
                                        <td>{purchase.user.name}</td>
                                        <td>
                                            <Link to={`/detail-purchase/${purchase.purchaseId}`}>
                                                <FontAwesomeIcon icon={faShoppingBag} className="details-icon" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No hay resultados</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <Pagination paginator={paginator} onChangePage={handlePage} />
                </div>
            ) : (
                <Loading />
            )}

        </div>
    );
}

export default Purchases;
