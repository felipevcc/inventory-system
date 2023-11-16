package com.inventorysystem.Backend.repository;

import com.inventorysystem.Backend.model.PurchaseDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchaseDetailRepository extends JpaRepository<PurchaseDetail, Long> {

    @Procedure(procedureName = "Proc_get_all_purchase_details")
    List<PurchaseDetail> getAllPurchaseDetails(@Param("Ip_purchase_id") Long purchaseId);

    @Procedure(procedureName = "Proc_insert_purchase_detail")
    void createPurchaseDetail(
            @Param("Ip_purchase_id") Long purchaseId,
            @Param("Ip_article_id") Long articleId,
            @Param("Ip_article_quantity") Long articleQuantity,
            @Param("Ip_price") Long price
    );
}
