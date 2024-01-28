import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import './searchbox.css';

const SearchBox = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        onSearch(searchQuery);
    }, [searchQuery, onSearch]);

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    }

    const handleClearClick = () => {
        setSearchQuery('');
    }

    return (
        <div className="search-box">
            <FontAwesomeIcon
                icon={faSearch}
                className="icon"
            />
            <input 
                type="search"
                placeholder="Buscar"
                value={searchQuery}
                onChange={handleInputChange}
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
