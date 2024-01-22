import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './providers.css';
import '../../styles/addbox.css';
import SearchBox from '../../components/search-box/SearchBox';
import Pagination from '../../components/pagination/Pagination';
import { Link, useNavigate } from 'react-router-dom';
import userVerification from '../../utils/userVerification';
import { API } from '../../env';

const Providers = () => {
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

        const url = new URL(`${API}/api/v1/provider`);
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

    const handleDelete = (id) => {
        const confirmDelete = window.confirm(`¿Estás seguro de que quieres eliminar este registro?`);

        if (confirmDelete) {
            // Call to the api to delete the record by id, modify the state
            console.log(`Registro con ID ${id} eliminado`);
        }
    }

    return (
        <div className="providers-container">

            <div className="text">Proveedores</div>

            <div className="options">
                <SearchBox onSearch={handleSearch} />
                <Link to="/new-provider" className="add-box">
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                    <span className="text">Nuevo proveedor</span>
                </Link>
            </div>

            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NOMBRE</th>
                            <th>TELÉFONO</th>
                            <th>EMAIL</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginator.providers && paginator.providers.map(provider => (
                            <tr key={provider.providerId}>
                                <td>{provider.providerId}</td>
                                <td>{provider.name}</td>
                                <td>{provider.phoneNumber}</td>
                                <td>{provider.email}</td>
                                <td>
                                    <Link to={`/edit-provider/${provider.providerId}`}>
                                        <FontAwesomeIcon icon={faPen} className="pen-icon" />
                                    </Link>
                                    <FontAwesomeIcon icon={faTrashCan} className="trash-icon" onClick={() => handleDelete(provider.providerId)} />
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

export default Providers;
