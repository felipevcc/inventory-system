package com.inventorysystem.Backend.mapper;

import com.inventorysystem.Backend.dto.CustomerDTO;
import com.inventorysystem.Backend.model.Customer;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CustomerMapper {
    @Autowired
    ModelMapper modelMapper;

    public CustomerDTO customerToDTO(Customer customer) {
        return modelMapper.map(customer, CustomerDTO.class);
    }
}
