package com.inventorysystem.Backend.service;

import com.inventorysystem.Backend.dto.purchase.PurchaseCreationDTO;
import com.inventorysystem.Backend.dto.purchase.PurchaseDTO;
import com.inventorysystem.Backend.dto.purchase.PurchaseDetailDTO;
import com.inventorysystem.Backend.dto.purchase.PurchasesPageDTO;

public interface PurchaseService {

    PurchaseDetailDTO createPurchase(PurchaseCreationDTO purchase);

    PurchasesPageDTO getAllPurchases(String criteria, Integer page, Integer pageSize);

    PurchaseDetailDTO getPurchaseById(Long id);
}
