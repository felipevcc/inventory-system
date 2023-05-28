import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faHouse, faTags, faBoxesStacked, faTruckFast, faBasketShopping, faUsers, faHandHoldingDollar, faUsersGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import logo from './img/logo.png';
import './styles/sidebar.css';

const Sidebar = () => {

    // Minimize or show sidebar
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Logout
    const navigate = useNavigate();
    function handleLogout (event) {
        event.preventDefault();
        // Actions to logout
        navigate('/login');
    };

    return (
        <nav className={`sidebar-container ${isSidebarOpen ? 'close' : ''}`}>
            <header>
                <div className="image-text">
                    <span className="image">
                        <img src={logo} alt="" />
                    </span>
                    <div className="text logo-text">
                        <span className="name">PedriniBike</span>
                        <span className="profession">Inventario</span>
                    </div>
                </div>
                <FontAwesomeIcon
                    icon={faAngleRight}
                    className="toggle"
                    onClick={toggleSidebar}
                />
            </header>
            <div className="menu-bar">
                <div className="menu">
                    <ul className="menu-links">
                        <li className="nav-link">
                            <Link to="/home">
                                <FontAwesomeIcon icon={faHouse} className="icon" />
                                <span className="text nav-text">Inicio</span>
                            </Link>
                        </li>
                        <li className="nav-link">
                            <Link to="/categories">
                                <FontAwesomeIcon icon={faTags} className="icon" />
                                <span className="text nav-text">Categorías</span>
                            </Link>
                        </li>
                        <li className="nav-link">
                            <Link to="/items">
                                <FontAwesomeIcon icon={faBoxesStacked} className="icon" />
                                <span className="text nav-text">Artículos</span>
                            </Link>
                        </li>
                        <li className="nav-link">
                            <Link to="/providers">
                                <FontAwesomeIcon icon={faTruckFast} className="icon" />
                                <span className="text nav-text">Proveedores</span>
                            </Link>
                        </li>
                        <li className="nav-link">
                            <Link to="/purchases">
                                <FontAwesomeIcon icon={faBasketShopping} className="icon" />
                                <span className="text nav-text">Compras</span>
                            </Link>
                        </li>
                        <li className="nav-link">
                            <Link to="/customers">
                                <FontAwesomeIcon icon={faUsers} className="icon" />
                                <span className="text nav-text">Clientes</span>
                            </Link>
                        </li>
                        <li className="nav-link">
                            <Link to="/sales">
                                <FontAwesomeIcon icon={faHandHoldingDollar} className="icon" />
                                <span className="text nav-text">Ventas</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="bottom-content">
                    <li className="">
                        <Link to="/users">
                            <FontAwesomeIcon icon={faUsersGear} className="icon" />
                            <span className="text nav-text">Usuarios</span>
                        </Link>
                    </li>
                    <li className="">
                        <Link onClick={handleLogout}>
                            <FontAwesomeIcon icon={faRightFromBracket} rotation={180} className="icon" />
                            <span className="text nav-text">Cerrar sesión</span>
                        </Link>
                    </li>
                </div>
            </div>
        </nav>
    );
}

export default Sidebar;
