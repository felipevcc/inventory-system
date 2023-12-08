package com.inventorysystem.Backend.mapper;

import com.inventorysystem.Backend.dto.SaleDTO;
import com.inventorysystem.Backend.model.Sale;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SaleMapper {

    @Autowired
    ModelMapper modelMapper;

    public SaleDTO saleToDTO(Sale sale) {
        return modelMapper.map(sale, SaleDTO.class);
    }
}
