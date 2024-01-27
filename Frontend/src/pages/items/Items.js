import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen } from '@fortawesome/free-solid-svg-icons';
import './items.css';
import '../../styles/addbox.css';
import SearchBox from '../../components/search-box/SearchBox';
import Pagination from '../../components/pagination/Pagination';
import { Link, useNavigate } from 'react-router-dom';
import userVerification from '../../utils/userVerification';
import { API } from '../../env';

const Items = () => {
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

        const url = new URL(`${API}/api/v1/article`);
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
                            <th>CATEGORIA</th>
                            <th>STOCK</th>
                            <th>PRECIO-COMPRA</th>
                            <th>PRECIO-VENTA</th>
                            <th>PESO</th>
                            <th>PROVEEDOR</th>
                            <th>EDITAR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginator.articles && paginator.articles.map(article => (
                            <tr key={article.articleId}>
                                <td>{article.articleId}</td>
                                <td>{article.name}</td>
                                <td>{article.brand}</td>
                                <td>{article.category.name}</td>
                                <td>{article.stock}</td>
                                <td>{article.purchasePrice.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                                <td>{article.salePrice.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                                <td>{article.weight}</td>
                                <td>{article.provider.name}</td>
                                <td>
                                    <Link to={`/edit-item/${article.articleId}`}>
                                        <FontAwesomeIcon icon={faPen} className="pen-icon" />
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

export default Items;
