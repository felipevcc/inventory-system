import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './itemselection.css';
import SearchBox from '../search-box/SearchBox';
import Pagination from '../pagination/Pagination';
import { API } from '../../env';
import userVerification from '../../utils/userVerification';

const ItemSelection = ({ onSelectionChange = null }) => {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const [paginator, setPaginator] = useState({});

    const navigate = useNavigate();

    const [articles, setArticles] = useState([]);

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
        <div className="item-selection-container">
            <div className="top-articles">
                <label>Artículos</label>
                <div className="options">
                    <SearchBox onSearch={handleSearch} />
                </div>
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
                            <th>PROVEEDOR</th>
                            <th>SELECCIONAR</th>
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
                                <td>{article.purchasePrice}</td>
                                <td>{article.salePrice}</td>
                                <td>{article.provider.name}</td>
                                {/* <td>
                                    <Link to={`/edit-item/${article.articleId}`}>
                                        <FontAwesomeIcon icon={faPen} className="pen-icon" />
                                    </Link>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination paginator={paginator} onChangePage={handlePage} />
            </div>
        </div>
    );
}

export default ItemSelection;
