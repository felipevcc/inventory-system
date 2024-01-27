package com.inventorysystem.Backend.service.imp;

import com.inventorysystem.Backend.dto.provider.ProviderCreationDTO;
import com.inventorysystem.Backend.dto.provider.ProviderDTO;
import com.inventorysystem.Backend.dto.provider.ProviderUpdateDTO;
import com.inventorysystem.Backend.dto.provider.ProvidersPageDTO;
import com.inventorysystem.Backend.mapper.ProviderMapper;
import com.inventorysystem.Backend.model.Provider;
import com.inventorysystem.Backend.repository.ProviderRepository;
import com.inventorysystem.Backend.repository.specifications.ProviderSpecifications;
import com.inventorysystem.Backend.service.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProviderServiceImp implements ProviderService {

    @Autowired
    ProviderRepository providerRepository;

    @Autowired
    ProviderMapper providerMapper;

    @Override
    @Transactional
    public ProviderDTO createProvider(ProviderCreationDTO provider) {
        Long newProviderId = providerRepository.createProvider(
                provider.getName(),
                provider.getPhoneNumber(),
                provider.getEmail()
        );
        return getProviderById(newProviderId);
    }

    @Override
    @Transactional
    public ProvidersPageDTO getAllProviders(String criteria, Integer page, Integer pageSize) {
        ProvidersPageDTO pagedProvidersResponse = new ProvidersPageDTO();

        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("providerId").descending());

        Page<Provider> providerPage;

        if (criteria == null || criteria.length() == 0) {
            providerPage = providerRepository.findAll(pageable);
        } else {
            providerPage = providerRepository.findAll(ProviderSpecifications.searchProviders(criteria), pageable);
        }

        List<ProviderDTO> providers = providerPage.getContent().stream()
                .map(provider -> providerMapper.providerToDTO(provider))
                .collect(Collectors.toList());

        pagedProvidersResponse.setPage(providerPage.getNumber() + 1);
        pagedProvidersResponse.setPageSize(providerPage.getSize());
        pagedProvidersResponse.setTotalRecords(providerPage.getTotalElements());
        pagedProvidersResponse.setTotalPages(providerPage.getTotalPages());
        if (pagedProvidersResponse.getTotalPages() == 0) {
            pagedProvidersResponse.setTotalPages(1);
        }
        pagedProvidersResponse.setProviders(providers);

        return pagedProvidersResponse;
    }

    @Override
    @Transactional
    public ProviderDTO getProviderById(Long id) {
        Provider foundProvider = providerRepository.getProviderById(id);
        return providerMapper.providerToDTO(foundProvider);
    }

    @Override
    @Transactional
    public ProviderDTO updateProvider(Long providerId, ProviderUpdateDTO providerData) {
        Provider foundProvider = providerRepository.getProviderById(providerId);

        if (!providerData.getEmail().equalsIgnoreCase(foundProvider.getEmail()) &&
            providerRepository.findByEmail(providerData.getEmail()) != null) {
            System.out.println("El correo no está disponible");
            return null;
        }

        foundProvider.setPhoneNumber(providerData.getPhoneNumber());
        foundProvider.setEmail(providerData.getEmail());

        providerRepository.updateProvider(
                foundProvider.getProviderId(),
                foundProvider.getName(),
                foundProvider.getPhoneNumber(),
                foundProvider.getEmail()
        );

        // Call class method for get by provider id
        return getProviderById(foundProvider.getProviderId());
    }
}
