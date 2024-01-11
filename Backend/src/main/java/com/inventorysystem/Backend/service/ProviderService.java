package com.inventorysystem.Backend.service;

import com.inventorysystem.Backend.dto.provider.ProviderCreationDTO;
import com.inventorysystem.Backend.dto.provider.ProviderDTO;
import com.inventorysystem.Backend.dto.provider.ProviderUpdateDTO;
import com.inventorysystem.Backend.dto.provider.ProvidersPageDTO;
import com.inventorysystem.Backend.model.Provider;

public interface ProviderService {

    ProviderDTO createProvider(ProviderCreationDTO provider);

    ProvidersPageDTO getAllProviders(String criteria, Integer page, Integer pageSize);

    ProviderDTO getProviderById(Long id);

    ProviderDTO updateProvider(Long providerId, ProviderUpdateDTO providerData);
}
