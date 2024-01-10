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

    @Query(nativeQuery = true, value = "SELECT purch.* FROM PURCHASE purch " +
            "JOIN PROVIDER prov ON purch.provider_id = prov.provider_id " +
            "JOIN USER us ON purch.user_id = us.user_id " +
            "WHERE CAST(purch.purchase_id AS CHAR) = ':searchTerm' " +
            "OR LOWER(prov.name) LIKE '%:searchTerm%' " +
            "OR LOWER(us.name) LIKE '%:searchTerm%' " +
            "OR LOWER(us.username) LIKE '%:searchTerm%'")
    Page<Purchase> findAllPurchases(@Param("searchTerm") String searchTerm, Pageable pageable);
}
