import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import './pagination.css';

const Pagination = ({paginator, onChangePage}) => {
    if (!paginator) {
        return null;
    }

    const onMaxLeft = () => {
        onChangePage(1);
    };
    
    const onLeft = () => {
        onChangePage(Math.max(paginator.page - 1, 1));
    };

    const onRight = () => {
        onChangePage(Math.min(paginator.page + 1, paginator.totalPages));
    };

    const onMaxRight = () => {
        onChangePage(paginator.totalPages);
    };

    return (
        <div className="pagination-container">
            <button className="pagination-button" type="button" onClick={onMaxLeft} disabled={paginator.page === 1}>
                <FontAwesomeIcon icon={faAngleDoubleLeft} className="icon" />
            </button>
            <button className="pagination-button" type="button" onClick={onLeft} disabled={paginator.page === 1}>
                <FontAwesomeIcon icon={faAngleLeft} className="icon" />
            </button>

            <div className="page-number">{paginator.page + "/" + paginator.totalPages}</div>

            <button className="pagination-button" type="button" onClick={onRight} disabled={paginator.page === paginator.totalPages}>
                <FontAwesomeIcon icon={faAngleRight} className="icon" />
            </button>
            <button className="pagination-button" type="button" onClick={onMaxRight} disabled={paginator.page === paginator.totalPages}>
                <FontAwesomeIcon icon={faAngleDoubleRight} className="icon" />
            </button>
        </div>
    );
}

export default Pagination;
