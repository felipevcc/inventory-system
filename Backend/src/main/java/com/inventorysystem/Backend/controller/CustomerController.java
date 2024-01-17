package com.inventorysystem.Backend.controller;

import com.inventorysystem.Backend.dto.customer.CustomerCreationDTO;
import com.inventorysystem.Backend.dto.customer.CustomerDTO;
import com.inventorysystem.Backend.dto.customer.CustomerUpdateDTO;
import com.inventorysystem.Backend.dto.customer.CustomersPageDTO;
import com.inventorysystem.Backend.model.Customer;
import com.inventorysystem.Backend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
@CrossOrigin
public class CustomerController {

    @Autowired
    CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping
    ResponseEntity<CustomerDTO> createCustomer(@RequestBody CustomerCreationDTO customer) {
        // Exceptions
        CustomerDTO createdCustomer = customerService.createCustomer(customer);
        return ResponseEntity.status(HttpStatus.OK).body(createdCustomer);
    }

    @GetMapping
    ResponseEntity<CustomersPageDTO> getAllCustomers(
            @RequestParam(name = "searchCriteria", required = false) String criteria,
            @RequestParam(name = "page") Integer page,
            @RequestParam(name = "pageSize") Integer pageSize
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(customerService.getAllCustomers(criteria, page, pageSize));
    }

    @GetMapping("/{id}")
    ResponseEntity<CustomerDTO> getCustomerById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(customerService.getCustomerById(id));
    }

    @GetMapping("/document/{document}")
    ResponseEntity<CustomerDTO> getCustomerByDocument(@PathVariable String document) {
        CustomerDTO foundCustomer = customerService.getCustomerByDocument(document);
        if (foundCustomer == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(foundCustomer);
    }

    @PutMapping("/{id}")
    ResponseEntity<CustomerDTO> updateCustomer(@PathVariable Long id, @RequestBody CustomerUpdateDTO customerData) {
        CustomerDTO updatedCustomer = customerService.updateCustomer(id, customerData);
        return ResponseEntity.status(HttpStatus.OK).body(updatedCustomer);
    }
}
