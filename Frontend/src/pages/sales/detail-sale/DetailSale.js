import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import userVerification from '../../../utils/userVerification';
import { API } from '../../../env';
import './detail-sale.css';
import Loading from '../../../components/loading/Loading';

const DetailSale = () => {
    localStorage.setItem('selectedView', 'sales');
    const { id } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    const [sale, setSale] = useState(null);

    useEffect(() => {
        // Permission validation
        if (!userVerification().isAuthenticated) {
            localStorage.clear();
            navigate('/login');
            return;
        }

        // Get sale by id
        (async () => {
            try {
                const response = await fetch(`${API}/api/v1/sale/${id}`);
                if (!response.ok) {
                    navigate('/sales');
                    return;
                }
                const data = await response.json();
                setSale(data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                navigate('/sales');
                return;
            }
        })();
    }, [navigate, id]);

    return (
        <div className="detailSale-container">

            <div className="text">Detalle de venta{" #" + id}</div>

            {!isLoading ? (
                <>
                    <div className="top-sale">
                        <h2>Cliente</h2>
                        <p>{sale ? sale.customer.name : ""}<br/>{sale ? sale.customer.email : ""}</p>
                        <h2>Usuario</h2>
                        <p>{sale ? sale.user.name : ""}<br/>{sale ? "@" + sale.user.username : ""}</p>
                        <h2>Venta</h2>
                    </div>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NOMBRE</th>
                                    <th>MARCA</th>
                                    <th>CANTIDAD</th>
                                    <th>PRECIO</th>
                                    <th>SUBTOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sale && sale.saleArticles.map(articleData => (
                                    <tr key={articleData.article.articleId}>
                                        <td>{articleData.article.articleId}</td>
                                        <td>{articleData.article.name}</td>
                                        <td>{articleData.article.brand}</td>
                                        <td>{articleData.articleQuantity}</td>
                                        <td>{(articleData.price / articleData.articleQuantity).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                                        <td>{articleData.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                                    </tr>
                                ))}
                                {sale &&
                                    <tr>
                                        <td colSpan="4"></td>
                                        <td className="total">TOTAL</td>
                                        <td className="total">{sale.totalValue.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <Loading />
            )}

        </div>
    );
}

export default DetailSale;
