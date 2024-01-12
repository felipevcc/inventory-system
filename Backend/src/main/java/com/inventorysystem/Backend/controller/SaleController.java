package com.inventorysystem.Backend.controller;

import com.inventorysystem.Backend.dto.sale.SaleCreationDTO;
import com.inventorysystem.Backend.dto.sale.SaleDetailDTO;
import com.inventorysystem.Backend.dto.sale.SalesPageDTO;
import com.inventorysystem.Backend.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sale")
@CrossOrigin
public class SaleController {

    @Autowired
    SaleService saleService;

    @PostMapping
    ResponseEntity<SaleDetailDTO> createSale(@RequestBody SaleCreationDTO sale) {
        SaleDetailDTO createdSale = saleService.createSale(sale);
        return ResponseEntity.status(HttpStatus.OK).body(createdSale);
    }

    @GetMapping
    ResponseEntity<SalesPageDTO> getAllSales(
            @RequestParam(name = "searchCriteria", required = false) String criteria,
            @RequestParam(name = "page") Integer page,
            @RequestParam(name = "pageSize") Integer pageSize
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(saleService.getAllSales(criteria, page, pageSize));
    }

    @GetMapping("/{id}")
    ResponseEntity<SaleDetailDTO> getSaleById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(saleService.getSaleById(id));
    }
}
