import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen } from '@fortawesome/free-solid-svg-icons';
import './customers.css';
import '../../styles/addbox.css';
import SearchBox from '../../components/search-box/SearchBox';
import Pagination from '../../components/pagination/Pagination';
import { Link, useNavigate } from 'react-router-dom';
import userVerification from '../../utils/userVerification';
import { API } from '../../env';

const Customers = () => {
    localStorage.setItem('selectedView', 'customers');
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

        const url = new URL(`${API}/api/v1/customer`);
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
        <div className="customers-container">

            <div className="text">Clientes</div>

            <div className="options">
                <SearchBox onSearch={handleSearch} />
                <Link to="/new-customer" className="add-box">
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                    <span className="text">Nuevo cliente</span>
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
                            <th>CÉDULA</th>
                            <th>DIRECCIÓN</th>
                            <th>DEPARTAMENTO</th>
                            <th>CIUDAD</th>
                            <th>EDITAR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginator.customers && paginator.customers.length > 0 ? (
                            paginator.customers.map(customer => (
                                <tr key={customer.customerId}>
                                    <td>{customer.customerId}</td>
                                    <td>{customer.name}</td>
                                    <td>{customer.phoneNumber}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.document}</td>
                                    <td>{customer.address}</td>
                                    <td>{customer.state}</td>
                                    <td>{customer.city}</td>
                                    <td>
                                        <Link to={`/edit-customer/${customer.customerId}`}>
                                            <FontAwesomeIcon icon={faPen} className="pen-icon" />
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9">No hay resultados</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <Pagination paginator={paginator} onChangePage={handlePage} />
            </div>

        </div>
    );
}

export default Customers;
