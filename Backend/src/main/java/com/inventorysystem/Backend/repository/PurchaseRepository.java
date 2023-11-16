package com.inventorysystem.Backend.repository;

import com.inventorysystem.Backend.model.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;
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
}
