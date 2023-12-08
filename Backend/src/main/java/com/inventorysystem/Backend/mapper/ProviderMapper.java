package com.inventorysystem.Backend.mapper;

import com.inventorysystem.Backend.dto.ProviderDTO;
import com.inventorysystem.Backend.model.Provider;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ProviderMapper {
    @Autowired
    ModelMapper modelMapper;

    public ProviderDTO providerToDTO(Provider provider) {
        return modelMapper.map(provider, ProviderDTO.class);
    }
}
