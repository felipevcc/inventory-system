package com.inventorysystem.Backend.service;

import com.inventorysystem.Backend.dto.sale.SaleCreationDTO;
import com.inventorysystem.Backend.dto.sale.SaleDetailDTO;
import com.inventorysystem.Backend.dto.sale.SalesPageDTO;

public interface SaleService {

    SaleDetailDTO createSale(SaleCreationDTO sale);

    SalesPageDTO getAllSales(String criteria, Integer page, Integer pageSize);

    SaleDetailDTO getSaleById(Long id);
}
