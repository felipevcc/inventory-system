package com.inventorysystem.Backend.service;

import com.inventorysystem.Backend.model.Customer;

import java.util.List;

public interface CustomerService {

    Customer createCustomer(Customer customer);

    Customer getCustomerById(Long id);

    List<Customer> getAllCustomers();
}
