import React, { useEffect, useState } from 'react';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faEye, faEyeSlash, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import './home.css';
import { Link, useNavigate } from 'react-router-dom';
import userVerification from '../../utils/userVerification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxesStacked, faTruckFast, faBasketShopping, faUsers, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { API } from '../../env';

const Home = () => {
    const navigate = useNavigate();

    const [dataSummary, setDataSummary] = useState(null);

    useEffect(() => {
        // Permission validation
        if (!userVerification().isAuthenticated) {
            localStorage.clear();
            navigate('/login');
            return;
        }

        // Query data
        (async () => {
            const url = new URL(`${API}/api/v1/data/summary`);
            await fetch(url)
                .then(response => response.json())
                .then(data => setDataSummary(data))
                .catch(error => console.log(error))
        })();
    }, [navigate]);

    return (
        <div className="home-container">
            <div className="text">Dashboard</div>

            <div className="dashboard">

                <div className="row-1">
                    <div className="panel item-1">
                        <div className="panel-heading">
                            <h3 className="panel-title">
                                <FontAwesomeIcon icon={faBoxesStacked} className="panel-title-icon" />
                                <span>Artículos</span>
                            </h3>
                        </div>
                        <div className="panel-body">
                            <p>
                                {dataSummary && dataSummary.categories.totalCategories > 0
                                    ? dataSummary.categories.totalCategories + " categoría" + (dataSummary.categories.totalCategories > 1 ? "s" : "") + " registrada" + (dataSummary.categories.totalCategories > 1 ? "s" : "")
                                    : "No hay categorías registradas"
                                }
                            </p>
                            <p>
                                {dataSummary && dataSummary.articles.totalArticles > 0
                                    ? dataSummary.articles.totalArticles + " artículo" + (dataSummary.articles.totalArticles > 1 ? "s" : "") + " registrado" + (dataSummary.articles.totalArticles > 1 ? "s" : "")
                                    : "No hay artículos registrados"
                                }
                            </p>
                            <p>
                                {dataSummary && dataSummary.articles.totalStock > 0
                                    ? dataSummary.articles.totalStock + " artículo" + (dataSummary.articles.totalStock > 1 ? "s" : "") + " en stock"
                                    : "No hay artículos en stock"
                                }
                            </p>
                        </div>
                        <div className="panel-footer">
                            <Link to={"/categories"} className='btn'>
                                Ver categorías
                            </Link>
                            <Link to={"/items"} className='btn'>
                                Ver artículos
                            </Link>
                        </div>
                    </div>

                    <div className="panel item-2">
                        <div className="panel-heading">
                            <h3 className="panel-title">
                                <FontAwesomeIcon icon={faTruckFast} className="panel-title-icon" />
                                <span>Proveedores</span>
                            </h3>
                        </div>
                        <div className="panel-body">
                            <p>
                                {dataSummary && dataSummary.providers.totalProviders > 0
                                    ? dataSummary.providers.totalProviders + " proveedor" + (dataSummary.providers.totalProviders > 1 ? "es" : "") + " registrado" + (dataSummary.providers.totalProviders > 1 ? "s" : "")
                                    : "No hay proveedores registrados"
                                }
                            </p>
                        </div>
                        <div className="panel-footer">
                            <Link to={"/providers"} className='btn'>
                                Ver proveedores
                            </Link>
                        </div>
                    </div>

                    <div className="panel item-3">
                        <div className="panel-heading">
                            <h3 className="panel-title">
                                <FontAwesomeIcon icon={faUsers} className="panel-title-icon" />
                                <span>Clientes</span>
                            </h3>
                        </div>
                        <div className="panel-body">
                            <p>
                                {dataSummary && dataSummary.customers.totalCustomers > 0
                                    ? dataSummary.customers.totalCustomers + " cliente" + (dataSummary.customers.totalCustomers > 1 ? "s" : "") + " registrado" + (dataSummary.customers.totalCustomers > 1 ? "s" : "")
                                    : "No hay clientes registrados"
                                }
                            </p>
                        </div>
                        <div className="panel-footer">
                            <Link to={"/customers"} className='btn'>
                                Ver clientes
                            </Link>
                        </div>
                    </div>
                </div>
    
                <div className="row-2">
                    <div className="panel item-4">
                        <div className="panel-heading">
                            <h3 className="panel-title">
                                <FontAwesomeIcon icon={faBasketShopping} className="panel-title-icon" />
                                <span>Compras</span>
                            </h3>
                        </div>
                        <div className="panel-body">
                            <div className="item">
                                <p>{dataSummary ? dataSummary.purchases.totalPurchases : ""} compras registradas</p>
                            </div>
                            <div className="item">
                                <h4>Último mes</h4>
                                <p>
                                    {dataSummary && dataSummary.purchases.totalPurchasesInLastMonth > 0
                                        ? (dataSummary.purchases.purchaseMoneyInLastMonth.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) + " en " + dataSummary.purchases.totalPurchasesInLastMonth + " compra" + (dataSummary.purchases.totalPurchasesInLastMonth > 1 ? "s" : ""))
                                        : "No hay compras en el último mes"
                                    }
                                </p>
                            </div>
                            <div className="item">
                                <h4>Última semana</h4>
                                <p>
                                    {dataSummary && dataSummary.purchases.totalPurchasesInLastWeek > 0
                                        ? (dataSummary.purchases.purchaseMoneyInLastWeek.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) + " en " + dataSummary.purchases.totalPurchasesInLastWeek + " compra" + (dataSummary.purchases.totalPurchasesInLastWeek > 1 ? "s" : ""))
                                        : "No hay compras en la última semana"
                                    }
                                </p>
                            </div>
                            <div className="item">
                                <h4>Último año</h4>
                                <p>
                                    {dataSummary && dataSummary.purchases.totalPurchasesInLastYear > 0
                                        ? (dataSummary.purchases.purchaseMoneyInLastYear.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) + " en " + dataSummary.purchases.totalPurchasesInLastYear + " compra" + (dataSummary.purchases.totalPurchasesInLastYear > 1 ? "s" : ""))
                                        : "No hay compras en el último año"
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="panel-footer">
                            <Link to={"/purchases"} className='btn'>
                                Ver compras
                            </Link>
                        </div>
                    </div>

                    <div className="panel item-5">
                        <div className="panel-heading">
                            <h3 className="panel-title">
                                <FontAwesomeIcon icon={faHandHoldingDollar} className="panel-title-icon" />
                                <span>Ventas</span>
                            </h3>
                        </div>
                        <div className="panel-body">
                            <div className="item">
                                <p>{dataSummary ? dataSummary.sales.totalSales : ""} ventas registradas</p>
                            </div>
                            <div className="item">
                                <h4>Último mes</h4>
                                <p>
                                    {dataSummary && dataSummary.sales.totalSalesInLastMonth > 0
                                        ? (dataSummary.sales.saleMoneyInLastMonth.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) + " en " + dataSummary.sales.totalSalesInLastMonth + " venta" + (dataSummary.sales.totalSalesInLastMonth > 1 ? "s" : ""))
                                        : "No hay ventas en el último mes"
                                    }
                                </p>
                            </div>
                            <div className="item">
                                <h4>Última semana</h4>
                                <p>
                                    {dataSummary && dataSummary.sales.totalSalesInLastWeek > 0
                                        ? (dataSummary.sales.saleMoneyInLastWeek.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) + " en " + dataSummary.sales.totalSalesInLastWeek + " venta" + (dataSummary.sales.totalSalesInLastWeek > 1 ? "s" : ""))
                                        : "No hay ventas en la última semana"
                                    }
                                </p>
                            </div>
                            <div className="item">
                                <h4>Último año</h4>
                                <p>
                                    {dataSummary && dataSummary.sales.totalSalesInLastYear > 0
                                        ? (dataSummary.sales.saleMoneyInLastYear.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) + " en " + dataSummary.sales.totalSalesInLastYear + " venta" + (dataSummary.sales.totalSalesInLastYear > 1 ? "s" : ""))
                                        : "No hay ventas en el último año"
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="panel-footer">
                            <Link to={"/sales"} className='btn'>
                                Ver ventas
                            </Link>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Home;
