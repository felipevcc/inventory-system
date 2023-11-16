package com.inventorysystem.Backend.repository;

import com.inventorysystem.Backend.model.SaleDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaleDetailRepository extends JpaRepository<SaleDetail, Long> {

    @Procedure(procedureName = "Proc_get_all_sale_details")
    List<SaleDetail> getAllSaleDetails(@Param("Ip_sale_id") Long saleId);

    @Procedure(procedureName = "Proc_insert_sale_detail")
    void createSaleDetail(
            @Param("Ip_sale_id") Long saleId,
            @Param("Ip_article_id") Long articleId,
            @Param("Ip_article_quantity") Long articleQuantity,
            @Param("Ip_price") Long price
    );
}
