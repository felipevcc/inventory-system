// SearchSelect.js
import React, { useState, useEffect } from 'react';
import './searchselect.css';

const SearchSelect = ({ label, placeholder, onSelected, apiUrl, optionsAttr }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        const data = new FormData();
        if (searchQuery.length > 0) {
            data.append('searchCriteria', searchQuery);
        }
        data.append('page', 1);
        data.append('pageSize', 8);

        const url = new URL(apiUrl);
        url.search = new URLSearchParams(data).toString();
        (async () => {
            await fetch(url)
                .then(response => response.json())
                .then(data => setOptions(data[optionsAttr] || []))
                .catch(error => console.log(error))
        })();
    }, [searchQuery, apiUrl, optionsAttr]);

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        const selectedOption = options.find((option) => option.id === selectedValue);
        setSelectedOption(selectedOption);
        onSelected(selectedOption);
    };

    return (
        <div className="form-item search-select-container">
            <label>{label}</label>
            <div className="search-select-inputs">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={searchQuery}
                    onChange={handleInputChange}
                    className="input"
                />
                <select value={selectedOption ? selectedOption.id : ''} onChange={handleSelectChange} className="input">
                    <option value="" disabled>
                        Selecciona una opción
                    </option>
                    {options.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SearchSelect;
