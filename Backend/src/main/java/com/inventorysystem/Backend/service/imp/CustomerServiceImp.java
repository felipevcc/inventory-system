package com.inventorysystem.Backend.service.imp;

import com.inventorysystem.Backend.dto.customer.CustomerCreationDTO;
import com.inventorysystem.Backend.dto.customer.CustomerDTO;
import com.inventorysystem.Backend.dto.customer.CustomerUpdateDTO;
import com.inventorysystem.Backend.dto.customer.CustomersPageDTO;
import com.inventorysystem.Backend.dto.user.UsersPageDTO;
import com.inventorysystem.Backend.mapper.CustomerMapper;
import com.inventorysystem.Backend.model.Customer;
import com.inventorysystem.Backend.repository.CustomerRepository;
import com.inventorysystem.Backend.repository.specifications.CustomerSpecifications;
import com.inventorysystem.Backend.service.CustomerService;
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
public class CustomerServiceImp implements CustomerService {

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    CustomerMapper customerMapper;

    @Override
    @Transactional
    public CustomerDTO createCustomer(CustomerCreationDTO customer) {
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
    public CustomersPageDTO getAllCustomers(String criteria, Integer page, Integer pageSize) {
        CustomersPageDTO pagedCustomersResponse = new CustomersPageDTO();

        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("customerId").descending());

        Page<Customer> customerPage;

        if (criteria == null || criteria.length() == 0) {
            customerPage = customerRepository.findAll(pageable);
        } else {
            customerPage = customerRepository.findAll(CustomerSpecifications.searchCustomers(criteria), pageable);
        }

        List<CustomerDTO> customers = customerPage.getContent().stream()
                .map(customer -> customerMapper.customerToDTO(customer))
                .collect(Collectors.toList());

        pagedCustomersResponse.setPage(customerPage.getNumber() + 1);
        pagedCustomersResponse.setPageSize(customerPage.getSize());
        pagedCustomersResponse.setTotalRecords(customerPage.getTotalElements());
        pagedCustomersResponse.setTotalPages(customerPage.getTotalPages());
        if (pagedCustomersResponse.getTotalPages() == 0) {
            pagedCustomersResponse.setTotalPages(1);
        }
        pagedCustomersResponse.setCustomers(customers);

        return pagedCustomersResponse;
    }

    @Override
    @Transactional
    public CustomerDTO getCustomerById(Long id) {
        Customer foundCustomer = customerRepository.getCustomerById(id);
        return customerMapper.customerToDTO(foundCustomer);
    }

    @Override
    @Transactional
    public CustomerDTO getCustomerByDocument(String document) {
        Customer foundCustomer = customerRepository.findByDocument(document);
        if (foundCustomer == null) {
            System.out.println("El cliente no está registrado");
            return null;
        }
        return customerMapper.customerToDTO(foundCustomer);
    }

    @Override
    @Transactional
    public CustomerDTO updateCustomer(Long customerId, CustomerUpdateDTO customerData) {
        Customer foundCustomer = customerRepository.getCustomerById(customerId);

        if (!customerData.getEmail().equalsIgnoreCase(foundCustomer.getEmail()) &&
            customerRepository.findByEmail(customerData.getEmail()) != null) {
            System.out.println("El correo no está disponible");
            return null;
        }

        foundCustomer.setPhoneNumber(customerData.getPhoneNumber());
        foundCustomer.setEmail(customerData.getEmail());
        foundCustomer.setAddress(customerData.getAddress());
        foundCustomer.setState(customerData.getState());
        foundCustomer.setCity(customerData.getCity());

        customerRepository.updateCustomer(
                foundCustomer.getCustomerId(),
                foundCustomer.getName(),
                foundCustomer.getPhoneNumber(),
                foundCustomer.getEmail(),
                foundCustomer.getDocument(),
                foundCustomer.getAddress(),
                foundCustomer.getState(),
                foundCustomer.getCity()
        );

        // Call class method for get by user id
        return getCustomerById(foundCustomer.getCustomerId());
    }
}
