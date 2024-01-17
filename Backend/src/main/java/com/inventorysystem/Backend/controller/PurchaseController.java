package com.inventorysystem.Backend.controller;

import com.inventorysystem.Backend.dto.purchase.PurchaseCreationDTO;
import com.inventorysystem.Backend.dto.purchase.PurchaseDetailDTO;
import com.inventorysystem.Backend.dto.purchase.PurchasesPageDTO;
import com.inventorysystem.Backend.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/purchase")
@CrossOrigin
public class PurchaseController {

    @Autowired
    PurchaseService purchaseService;

    @PostMapping
    ResponseEntity<PurchaseDetailDTO> createPurchase(@RequestBody PurchaseCreationDTO purchase) {
        PurchaseDetailDTO createdPurchase = purchaseService.createPurchase(purchase);
        return ResponseEntity.status(HttpStatus.OK).body(createdPurchase);
    }

    @GetMapping
    ResponseEntity<PurchasesPageDTO> getAllPurchases(
            @RequestParam(name = "searchCriteria", required = false) String criteria,
            @RequestParam(name = "page") Integer page,
            @RequestParam(name = "pageSize") Integer pageSize
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(purchaseService.getAllPurchases(criteria, page, pageSize));
    }

    @GetMapping("/{id}")
    ResponseEntity<PurchaseDetailDTO> getPurchaseById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(purchaseService.getPurchaseById(id));
    }
}
