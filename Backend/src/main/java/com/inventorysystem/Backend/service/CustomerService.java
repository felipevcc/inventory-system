package com.inventorysystem.Backend.service;

import com.inventorysystem.Backend.dto.customer.CustomerDTO;
import com.inventorysystem.Backend.dto.customer.CustomerUpdateDTO;
import com.inventorysystem.Backend.dto.customer.CustomersPageDTO;
import com.inventorysystem.Backend.model.Customer;

import java.util.List;

public interface CustomerService {

    CustomerDTO createCustomer(Customer customer);

    CustomersPageDTO getAllCustomers(String criteria, Integer page, Integer pageSize);

    CustomerDTO getCustomerById(Long id);

    CustomerDTO updateCustomer(Long customerId, CustomerUpdateDTO customerData);
}
