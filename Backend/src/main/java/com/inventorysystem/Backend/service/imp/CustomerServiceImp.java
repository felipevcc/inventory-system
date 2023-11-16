package com.inventorysystem.Backend.service.imp;

import com.inventorysystem.Backend.model.Customer;
import com.inventorysystem.Backend.repository.CustomerRepository;
import com.inventorysystem.Backend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CustomerServiceImp implements CustomerService {

    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerServiceImp(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public Customer createCustomer(Customer customer) {
        Long newCustomerId = customerRepository.createCustomer(
                customer.getName(),
                customer.getPhoneNumber(),
                customer.getEmail(),
                customer.getDocument(),
                customer.getAddress(),
                customer.getState(),
                customer.getCity()
        );
        return getCustomerById(newCustomerId);
    }

    @Override
    @Transactional
    public Customer getCustomerById(Long id) {
        //return customerRepository.findById(id).orElse(null);
        return customerRepository.getCustomerById(id);
    }

    @Override
    @Transactional
    public List<Customer> getAllCustomers() {
        return customerRepository.getAllCustomers();
    }
}
