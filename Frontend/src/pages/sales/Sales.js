import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import './sales.css';
import '../../styles/addbox.css';
import SearchBox from '../../components/search-box/SearchBox';
import Pagination from '../../components/pagination/Pagination';
import { Link, useNavigate } from 'react-router-dom';
import userVerification from '../../utils/userVerification';
import { API } from '../../env';
import formatDate from '../../utils/formatDate';

const Sales = () => {
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

        const url = new URL(`${API}/api/v1/sale`);
        url.search = new URLSearchParams(data).toString();
        (async () => {
            await fetch(url)
                .then(response => response.json())
                .then(data => setPaginator(data))
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
                            <th>TOTAL</th>
                            <th>CLIENTE</th>
                            <th>USUARIO</th>
                            <th>DETALLES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginator.sales && paginator.sales.map(sale => (
                            <tr key={sale.saleId}>
                                <td>{sale.saleId}</td>
                                <td>{formatDate(sale.createdAt)}</td>
                                <td>${sale.totalValue} COP</td>
                                <td>{sale.customer.name}</td>
                                <td>{sale.user.name}</td>
                                <td>
                                    <Link to={`/detail-sale/${sale.saleId}`}>
                                        <FontAwesomeIcon icon={faCartPlus} className="details-icon" />
                                    </Link>
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

export default Sales;
