import React, { Fragment, useState, useEffect } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import './searchselect.css';

const SearchSelect = ({ label, placeholder, onSelected, apiUrl, optionsAttr, isRequired = false }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        const data = new FormData();
        if (searchQuery.length > 0) {
            data.append('searchCriteria', searchQuery);
        }
        data.append('page', 1);
        data.append('pageSize', 6);

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
    }

    const handleSelectChange = (option) => {
        if (option) {
            setSelectedOption(option);
            onSelected(option);
        }
    }

    const getIdKey = (option) => {
        const idKey = Object.keys(option).find(key => key.endsWith('Id'));
        return option[idKey];
    }

    return (
        <div className="form-item search-select-container relative mt-1 w-full max-h-72 custom-max-content-height">
            <label>{label}</label>
            <Combobox value={selectedOption} onChange={(option) => option && handleSelectChange(option)}>
                <div className="search-select-inputs relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm max-h-60">
                    <Combobox.Input
                        className="input w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                        displayValue={(person) => (person ? person.name : '')}
                        placeholder={placeholder}
                        onChange={handleInputChange}
                        required={isRequired}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </Combobox.Button>
                </div>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setSearchQuery('')}
                >
                    <Combobox.Options
                        className="absolute mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black/5 focus:outline-none sm:text-sm"
                        style={{ zIndex: 1000, top: 'calc(100%)' }}
                    >
                        <Combobox.Option
                            className="relative cursor-not-allowed select-none py-1 pl-8 pr-4 text-gray-500"
                            value={null}
                            disabled
                        >
                            Selecciona una opción
                        </Combobox.Option>
                        {options.length === 0 && searchQuery !== '' ? (
                            <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                No se encontró nada.
                            </div>
                        ) : (
                            options.map((option) => (
                                <Combobox.Option
                                    key={getIdKey(option)}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-1 pl-8 pr-4 ${active ? 'bg-blue-600 text-white' : 'text-gray-900'
                                        }`
                                    }
                                    value={option}
                                >
                                    {({ selectedOption, active }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selectedOption ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {option.name}
                                            </span>
                                            {selectedOption ? (
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-2 ${active ? 'text-white' : 'text-blue-600'
                                                        }`}
                                                >
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </Combobox>
        </div>
    );
};

export default SearchSelect;
