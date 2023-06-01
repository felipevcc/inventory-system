import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faHouse, faTags, faBoxesStacked, faTruckFast, faBasketShopping, faUsers, faHandHoldingDollar, faUsersGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import logo from '../img/logo.png';
import '../styles/sidebar.css';

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

    // Selected view
    const [selectedView, setSelectedView] = useState("");
    const handleSelectedView = (view) => {
        setSelectedView(view);
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
                        <li className={`nav-link ${selectedView === "home" ? "selected" : ""}`}>
                            <Link to="/home" onClick={() => handleSelectedView("home")}>
                                <FontAwesomeIcon icon={faHouse} className="icon" />
                                <span className="text nav-text">Inicio</span>
                            </Link>
                        </li>
                        <li className={`nav-link ${selectedView === "categories" ? "selected" : ""}`}>
                            <Link to="/categories" onClick={() => handleSelectedView("categories")}>
                                <FontAwesomeIcon icon={faTags} className="icon" />
                                <span className="text nav-text">Categorías</span>
                            </Link>
                        </li>
                        <li className={`nav-link ${selectedView === "items" ? "selected" : ""}`}>
                            <Link to="/items" onClick={() => handleSelectedView("items")}>
                                <FontAwesomeIcon icon={faBoxesStacked} className="icon" />
                                <span className="text nav-text">Artículos</span>
                            </Link>
                        </li>
                        <li className={`nav-link ${selectedView === "providers" ? "selected" : ""}`}>
                            <Link to="/providers" onClick={() => handleSelectedView("providers")}>
                                <FontAwesomeIcon icon={faTruckFast} className="icon" />
                                <span className="text nav-text">Proveedores</span>
                            </Link>
                        </li>
                        <li className={`nav-link ${selectedView === "purchases" ? "selected" : ""}`}>
                            <Link to="/purchases" onClick={() => handleSelectedView("purchases")}>
                                <FontAwesomeIcon icon={faBasketShopping} className="icon" />
                                <span className="text nav-text">Compras</span>
                            </Link>
                        </li>
                        <li className={`nav-link ${selectedView === "customers" ? "selected" : ""}`}>
                            <Link to="/customers" onClick={() => handleSelectedView("customers")}>
                                <FontAwesomeIcon icon={faUsers} className="icon" />
                                <span className="text nav-text">Clientes</span>
                            </Link>
                        </li>
                        <li className={`nav-link ${selectedView === "sales" ? "selected" : ""}`}>
                            <Link to="/sales" onClick={() => handleSelectedView("sales")}>
                                <FontAwesomeIcon icon={faHandHoldingDollar} className="icon" />
                                <span className="text nav-text">Ventas</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="bottom-content">
                    <li className={`${selectedView === "users" ? "selected" : ""}`}>
                        <Link to="/users" onClick={() => handleSelectedView("users")}>
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
