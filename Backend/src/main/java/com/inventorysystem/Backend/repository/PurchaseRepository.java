package com.inventorysystem.Backend.repository;

import com.inventorysystem.Backend.model.Purchase;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, Long> {

    @Procedure(procedureName = "Proc_get_all_purchases")
    List<Purchase> getAllPurchases();

    @Procedure(procedureName = "Proc_get_purchase_by_id")
    Purchase getPurchaseById(@Param("Ip_purchase_id") Long purchaseId);

    @Procedure(procedureName = "Proc_insert_purchase", outputParameterName = "Op_purchase_id")
    Long createPurchase(
            @Param("Ip_total_value") Long totalValue,
            @Param("Ip_provider_id") Long providerId,
            @Param("Ip_user_id") Long userId
    );

    @Query(nativeQuery = true, value = "SELECT purch.* FROM purchase purch " +
            "JOIN provider prov ON purch.provider_id = prov.provider_id " +
            "JOIN user us ON purch.user_id = us.user_id " +
            "WHERE CAST(purch.purchase_id AS CHAR) = :searchTerm " +
            "OR prov.name LIKE %:searchTerm% " +
            "OR us.name LIKE %:searchTerm% " +
            "OR us.username LIKE %:searchTerm%",
            countQuery = "SELECT COUNT(purch.purchase_id) FROM purchase purch " +
                    "JOIN provider prov ON purch.provider_id = prov.provider_id " +
                    "JOIN user us ON purch.user_id = us.user_id " +
                    "WHERE CAST(purch.purchase_id AS CHAR) = :searchTerm " +
                    "OR prov.name LIKE %:searchTerm% " +
                    "OR us.name LIKE %:searchTerm% " +
                    "OR us.username LIKE %:searchTerm%")
    Page<Purchase> findAllPurchases(@Param("searchTerm") String searchTerm, Pageable pageable);

    // Data summary queries
    @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM purchase " +
        "WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 1 WEEK)")
    Long getTotalPurchasesInLastWeek();
    @Query(nativeQuery = true, value = "SELECT SUM(total_value) FROM purchase " +
            "WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 1 WEEK)")
    Long getPurchaseMoneyInLastWeek();

    @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM purchase " +
            "WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)")
    Long getTotalPurchasesInLastMonth();
    @Query(nativeQuery = true, value = "SELECT SUM(total_value) FROM purchase " +
            "WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)")
    Long getPurchaseMoneyInLastMonth();

    @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM purchase " +
            "WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)")
    Long getTotalPurchasesInLastYear();

    @Query(nativeQuery = true, value = "SELECT SUM(total_value) FROM purchase " +
            "WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)")
    Long getPurchaseMoneyInLastYear();
}
