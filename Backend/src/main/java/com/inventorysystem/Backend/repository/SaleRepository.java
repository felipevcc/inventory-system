package com.inventorysystem.Backend.repository;

import com.inventorysystem.Backend.model.Sale;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
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

    @Query(nativeQuery = true, value = "SELECT sl.* FROM sale sl " +
            "JOIN customer cus ON sl.customer_id = cus.customer_id " +
            "JOIN user us ON sl.user_id = us.user_id " +
            "WHERE CAST(sl.sale_id AS CHAR) = :searchTerm " +
            "OR cus.name LIKE %:searchTerm% " +
            "OR cus.document LIKE %:searchTerm% " +
            "OR us.name LIKE %:searchTerm% " +
            "OR us.username LIKE %:searchTerm%",
            countQuery = "SELECT COUNT(sl.sale_id) FROM sale sl " +
                    "JOIN customer cus ON sl.customer_id = cus.customer_id " +
                    "JOIN user us ON sl.user_id = us.user_id " +
                    "WHERE CAST(sl.sale_id AS CHAR) = :searchTerm " +
                    "OR cus.name LIKE %:searchTerm% " +
                    "OR cus.document LIKE %:searchTerm% " +
                    "OR us.name LIKE %:searchTerm% " +
                    "OR us.username LIKE %:searchTerm%")
    Page<Sale> findAllSales(@Param("searchTerm") String searchTerm, Pageable pageable);

    // Data summary queries
    @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM sale " +
            "WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 1 WEEK)")
    Long getTotalSalesInLastWeek();
    @Query(nativeQuery = true, value = "SELECT SUM(total_value) FROM sale " +
            "WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 1 WEEK)")
    Long getSaleMoneyInLastWeek();

    @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM sale " +
            "WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)")
    Long getTotalSalesInLastMonth();
    @Query(nativeQuery = true, value = "SELECT SUM(total_value) FROM sale " +
            "WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)")
    Long getSaleMoneyInLastMonth();

    @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM sale " +
            "WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)")
    Long getTotalSalesInLastYear();
    @Query(nativeQuery = true, value = "SELECT SUM(total_value) FROM sale " +
            "WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)")
    Long getSaleMoneyInLastYear();
}
