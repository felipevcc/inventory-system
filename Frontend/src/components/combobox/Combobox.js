import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import './combobox.css';

const people = [
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
];

export default function MyCombobox() {
    const [selected, setSelected] = useState(people[0]);
    const [query, setQuery] = useState('');

    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) =>
                person.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
            );

    return (
        <div className="form-item search-select-container relative mt-1 w-full max-h-72 custom-max-content-height">
            <label>Proveedor</label>
            <Combobox value={selected} onChange={setSelected}>
                <div className="search-select-inputs relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm max-h-60">
                    <Combobox.Input
                        className="input w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                        displayValue={(person) => person.name}
                        onChange={(event) => setQuery(event.target.value)}
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
                    afterLeave={() => setQuery('')}
                >
                    <Combobox.Options
                        className="absolute mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black/5 focus:outline-none sm:text-sm"
                        style={{ zIndex: 1000, top: 'calc(100%)' }}
                    >

                        <Combobox.Option
                            className="relative cursor-not-allowed select-none py-1 pl-3 pr-4 text-gray-500"
                            value={null}
                            disabled
                        >
                            Selecciona una opción
                        </Combobox.Option>

                        {filteredPeople.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                No se encontró nada.
                            </div>
                        ) : (
                            filteredPeople.map((person) => (
                                <Combobox.Option
                                    key={person.id}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-1 pl-8 pr-4 ${active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                        }`
                                    }
                                    value={person}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {person.name}
                                            </span>
                                            {selected ? (
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-2 ${active ? 'text-white' : 'text-indigo-600'
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
}
