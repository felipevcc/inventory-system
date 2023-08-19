import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import './searchbox.css';

const SearchBox = ({ onSearch }) => {

    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onSearch(searchQuery);
        }
    };

    const handleIconClick = () => {
        onSearch(searchQuery);
    };

    const handleClearClick = () => {
        setSearchQuery('');
    };

    return (
        <div className="search-box">
            <input 
                type="search"
                placeholder="Buscar"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <FontAwesomeIcon
                icon={faSearch}
                className="icon"
                onClick={handleIconClick}
            />
            {searchQuery && (
                <FontAwesomeIcon
                    icon={faTimes}
                    className="clear-icon"
                    onClick={handleClearClick}
                />
            )}
        </div>
    );
};

export default SearchBox;
