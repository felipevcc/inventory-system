package com.inventorysystem.Backend.mapper;

import com.inventorysystem.Backend.dto.PurchaseDTO;
import com.inventorysystem.Backend.model.Purchase;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PurchaseMapper {
    @Autowired
    ModelMapper modelMapper;

    public PurchaseDTO purchaseToDTO(Purchase purchase) {
        return modelMapper.map(purchase, PurchaseDTO.class);
    }
}
