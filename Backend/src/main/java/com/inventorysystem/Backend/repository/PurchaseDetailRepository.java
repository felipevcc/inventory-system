package com.inventorysystem.Backend.repository;

import com.inventorysystem.Backend.model.PurchaseDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchaseDetailRepository extends JpaRepository<PurchaseDetail, Long> {
}
