import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userVerification from '../../../utils/userVerification';
import '../../../styles/new-edit-form.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { API } from '../../../env';
import SearchSelect from '../../../components/search-select/SearchSelect';
import './select-provider.css';

const SelectProvider = () => {
    localStorage.setItem('selectedView', 'purchases');
    const navigate = useNavigate();

    const [submitDisabled, setSubmitDisabled] = useState(false);

    const [providerId, setProviderId] = useState(0);

    useEffect(() => {
        // Permission validation
        if (!userVerification().isAuthenticated) {
            localStorage.clear();
            navigate('/login');
            return;
        }
    }, [navigate]);

    const handleProviderSelect = (provider) => {
        setProviderId(provider.providerId);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitDisabled(true);
        navigate(`/new-purchase/${providerId}`);
        setSubmitDisabled(false);
    }

    return (
        <div className="selectProvider-container">

            <div className="text">Nueva Compra</div>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="grid-form">
                        <SearchSelect
                            label="Selecciona el proveedor"
                            placeholder="Buscar proveedor..."
                            onSelected={handleProviderSelect}
                            apiUrl={`${API}/api/v1/provider`}
                            optionsAttr="providers"
                            isRequired={true}
                        />
                    </div>

                    <div className="button-container">
                        <button className="btn" type="submit" disabled={submitDisabled}>
                            <span>Continuar</span>
                            <FontAwesomeIcon icon={faArrowRight} className="details-icon" />
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default SelectProvider;
