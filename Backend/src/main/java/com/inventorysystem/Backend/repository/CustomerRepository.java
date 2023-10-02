package com.inventorysystem.Backend.repository;

import com.inventorysystem.Backend.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    List<Customer> findAllByOrderByCreatedAtAsc();
}
