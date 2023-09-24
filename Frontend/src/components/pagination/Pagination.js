import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import './pagination.css';

const Pagination = () => {
    return (
        <div className="pagination-container">
            <button className="pagination-button"><FontAwesomeIcon icon={faAngleDoubleLeft} className="icon" /></button>
            <button className="pagination-button"><FontAwesomeIcon icon={faAngleLeft} className="icon" /></button>
            <div className="page-number">1/1</div>
            <button className="pagination-button"><FontAwesomeIcon icon={faAngleRight} className="icon" /></button>
            <button className="pagination-button"><FontAwesomeIcon icon={faAngleDoubleRight} className="icon" /></button>
        </div>
    );
}

export default Pagination;
