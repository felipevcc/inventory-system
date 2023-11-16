package com.inventorysystem.Backend.repository;

import com.inventorysystem.Backend.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    @Procedure(procedureName = "Proc_get_all_customers")
    List<Customer> getAllCustomers();

    @Procedure(procedureName = "Proc_get_customer_by_id")
    Customer getCustomerById(@Param("Ip_customer_id") Long customerId);

    @Procedure(procedureName = "Proc_insert_customer", outputParameterName = "Op_customer_id")
    Long createCustomer(
            @Param("Ip_name") String name,
            @Param("Ip_phone_number") String phoneNumber,
            @Param("Ip_email") String email,
            @Param("Ip_document") String document,
            @Param("Ip_address") String address,
            @Param("Ip_state") String state,
            @Param("Ip_city") String city
    );

    @Procedure(procedureName = "Proc_update_customer")
    void updateCustomer(
            @Param("Ip_customer_id") Long customerId,
            @Param("Ip_name") String name,
            @Param("Ip_phone_number") String phoneNumber,
            @Param("Ip_email") String email,
            @Param("Ip_document") String document,
            @Param("Ip_address") String address,
            @Param("Ip_state") String state,
            @Param("Ip_city") String city
    );

    @Procedure(name = "Proc_delete_customer")
    void deleteCustomer(@Param("Ip_customer_id") Long customerId);
}
