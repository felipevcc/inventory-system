import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './users.css';
import '../../styles/addbox.css';
import SearchBox from '../../components/search-box/SearchBox';
import Pagination from '../../components/pagination/Pagination';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../../env';
import userVerification from '../../utils/userVerification';

const Users = () => {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const [paginator, setPaginator] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        // Permission validation
        const userVer = userVerification();
        if (!userVer.isAuthenticated) {
            localStorage.clear();
            navigate('/login');
            return;
        } else if (!userVer.isAdmin) {
            navigate('/home');
            return;
        }

        // Query paginated data
        //console.log('Efecto ejecutado con query:', query, 'y page:', page);
        const data = new FormData();
        if (query.length > 0) {
            data.append('searchCriteria', query);
        }
        data.append('page', page);
        data.append('pageSize', pageSize);

        const url = new URL(`${API}/api/v1/user`);
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
        <div className="users-container">

            <div className="text">Usuarios</div>

            <div className="options">
                <SearchBox onSearch={handleSearch} />
                <Link to="/new-user" className="add-box">
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                    <span className="text">Nuevo usuario</span>
                </Link>
            </div>

            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NOMBRE</th>
                            <th>USUARIO</th>
                            <th>TELÉFONO</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginator.users && paginator.users.map(user => (
                            <tr key={user.userId}>
                                <td>{user.userId}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.phoneNumber}</td>
                                <td>{user.email}</td>
                                <td>{user.admin ? 'Si' : 'No'}</td>
                                <td>
                                    <Link to={`/edit-user/${user.userId}`}>
                                        <FontAwesomeIcon icon={faPen} className="pen-icon" />
                                    </Link>
                                    <FontAwesomeIcon icon={faTrashCan} className="trash-icon" onClick={() => handleDelete(user.userId)} />
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

export default Users;
