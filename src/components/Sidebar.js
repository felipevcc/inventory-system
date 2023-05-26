import React, { useState } from 'react';
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

    return (
        <nav className={`sidebar ${isSidebarOpen ? 'close' : ''}`}>
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
                            <a href="home.html">
                                <FontAwesomeIcon icon={faHouse} className="icon" />
                                <span className="text nav-text">Inicio</span>
                            </a>
                        </li>
                        <li className="nav-link">
                            <a href="#">
                                <FontAwesomeIcon icon={faTags} className="icon" />
                                <span className="text nav-text">Categorías</span>
                            </a>
                        </li>
                        <li className="nav-link">
                            <a href="#">
                                <FontAwesomeIcon icon={faBoxesStacked} className="icon" />
                                <span className="text nav-text">Artículos</span>
                            </a>
                        </li>
                        <li className="nav-link">
                            <a href="#">
                                <FontAwesomeIcon icon={faTruckFast} className="icon" />
                                <span className="text nav-text">Proveedores</span>
                            </a>
                        </li>
                        <li className="nav-link">
                            <a href="#">
                                <FontAwesomeIcon icon={faBasketShopping} className="icon" />
                                <span className="text nav-text">Compras</span>
                            </a>
                        </li>
                        <li className="nav-link">
                            <a href="#">
                                <FontAwesomeIcon icon={faUsers} className="icon" />
                                <span className="text nav-text">Clientes</span>
                            </a>
                        </li>
                        <li className="nav-link">
                            <a href="#">
                                <FontAwesomeIcon icon={faHandHoldingDollar} className="icon" />
                                <span className="text nav-text">Ventas</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="bottom-content">
                    <li className="">
                        <a href="#">
                            <FontAwesomeIcon icon={faUsersGear} className="icon" />
                            <span className="text nav-text">Usuarios</span>
                        </a>
                    </li>
                    <li className="">
                        <a href="#">
                            <FontAwesomeIcon icon={faRightFromBracket} rotation={180} className="icon" />
                            <span className="text nav-text">Cerrar sesión</span>
                        </a>
                    </li>
                </div>
            </div>
        </nav>
    );
}

export default Sidebar;
