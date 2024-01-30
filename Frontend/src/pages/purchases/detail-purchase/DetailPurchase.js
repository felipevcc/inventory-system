import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import userVerification from '../../../utils/userVerification';
import { API } from '../../../env';
import './detail-purchase.css';

const DetailPurchase = () => {
    localStorage.setItem('selectedView', 'purchases');
    const { id } = useParams();
    const navigate = useNavigate();

    const [purchase, setPurchase] = useState(null);

    useEffect(() => {
        // Permission validation
        if (!userVerification().isAuthenticated) {
            localStorage.clear();
            navigate('/login');
            return;
        }

        // Get purchase by id
        (async () => {
            try {
                const response = await fetch(`${API}/api/v1/purchase/${id}`);
                if (!response.ok) {
                    navigate('/purchases');
                    return;
                }
                const data = await response.json();
                setPurchase(data);
            } catch (error) {
                console.log(error);
                navigate('/purchases');
                return;
            }
        })();
    }, [navigate, id]);

    return (
        <div className="detailPurchase-container">

            <div className="text">Detalle de compra{purchase ? " #" + purchase.purchaseId : ""}</div>

            <div className="top-purchase">
                <h2>Proveedor</h2>
                <p>{purchase ? purchase.provider.name : ""}<br/>{purchase ? purchase.provider.email : ""}</p>
                <h2>Usuario</h2>
                <p>{purchase ? purchase.user.name : ""}<br/>{purchase ? "@" + purchase.user.username : ""}</p>
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
                        {purchase && purchase.purchaseArticles.map(articleData => (
                            <tr key={articleData.article.articleId}>
                                <td>{articleData.article.articleId}</td>
                                <td>{articleData.article.name}</td>
                                <td>{articleData.article.brand}</td>
                                <td>{articleData.articleQuantity}</td>
                                <td>{(articleData.price / articleData.articleQuantity).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                                <td>{articleData.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                            </tr>
                        ))}
                        {purchase &&
                            <tr>
                                <td colSpan="4"></td>
                                <td className="total">TOTAL</td>
                                <td className="total">{purchase.totalValue.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DetailPurchase;
