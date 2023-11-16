package com.inventorysystem.Backend.repository;

import com.inventorysystem.Backend.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {

    @Procedure(procedureName = "Proc_get_all_sales")
    List<Sale> getAllSales();

    @Procedure(procedureName = "Proc_get_sale_by_id")
    Sale getSaleById(@Param("Ip_sale_id") Long saleId);

    @Procedure(procedureName = "Proc_insert_sale", outputParameterName = "Op_sale_id")
    Long createSale(
            @Param("Ip_total_value") Long totalValue,
            @Param("Ip_customer_id") Long customerId,
            @Param("Ip_user_id") Long userId
    );
}
