package com.inventorysystem.Backend.service.imp;

import com.inventorysystem.Backend.dto.purchase.PurchaseCreationDTO;
import com.inventorysystem.Backend.dto.purchase.PurchaseDTO;
import com.inventorysystem.Backend.dto.purchase.PurchaseDetailDTO;
import com.inventorysystem.Backend.dto.purchase.PurchasesPageDTO;
import com.inventorysystem.Backend.mapper.PurchaseMapper;
import com.inventorysystem.Backend.model.Article;
import com.inventorysystem.Backend.model.Purchase;
import com.inventorysystem.Backend.model.PurchaseDetail;
import com.inventorysystem.Backend.repository.ArticleRepository;
import com.inventorysystem.Backend.repository.PurchaseDetailRepository;
import com.inventorysystem.Backend.repository.PurchaseRepository;
import com.inventorysystem.Backend.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PurchaseServiceImp implements PurchaseService {

    @Autowired
    PurchaseRepository purchaseRepository;

    @Autowired
    PurchaseDetailRepository purchaseDetailRepository;

    @Autowired
    ArticleRepository articleRepository;

    @Autowired
    PurchaseMapper purchaseMapper;

    @Override
    @Transactional
    public PurchaseDetailDTO createPurchase(PurchaseCreationDTO purchase) {
        if (purchase.getArticlesIds().isEmpty()) {
            System.out.println("Se requiere al menos un artículo en la compra");
            return null;
        }

        List<Long> validArticles = new ArrayList<>();
        Long totalPurchasePrice = 0L;
        for (Long articleId:purchase.getArticlesIds()) {
            if (!articleRepository.existsById(articleId) || validArticles.contains(articleId)) {
                continue;
            }
            // Add valid id
            validArticles.add(articleId);
            // Add price to the total value of the purchase
            Article foundArticle = articleRepository.getArticleById(articleId);
            totalPurchasePrice += foundArticle.getPurchasePrice();
        }

        if (validArticles.isEmpty()) {
            System.out.println("Ningún artículo existente");
            return null;
        }

        Long newPurchaseId = purchaseRepository.createPurchase(
                totalPurchasePrice,
                purchase.getProviderId(),
                purchase.getSessionUserId()
        );
        return getPurchaseById(newPurchaseId);
    }

    @Override
    @Transactional
    public PurchasesPageDTO getAllPurchases(String criteria, Integer page, Integer pageSize) {
        PurchasesPageDTO pagedPurchasesResponse = new PurchasesPageDTO();

        Page<Purchase> purchasePage;

        if (criteria == null || criteria.length() == 0) {
            Pageable pageable = PageRequest.of(page, pageSize, Sort.by("purchaseId").descending());
            purchasePage = purchaseRepository.findAll(pageable);
        } else {
            Pageable pageable = PageRequest.of(page, pageSize, Sort.by("purchase_id").descending()); // purchase_id because it is a native query
            purchasePage = purchaseRepository.findAllPurchases(criteria, pageable);
        }

        List<PurchaseDTO> purchases = purchasePage.getContent().stream()
                .map(purchase -> purchaseMapper.purchaseToDTO(purchase))
                .collect(Collectors.toList());

        pagedPurchasesResponse.setPage(purchasePage.getNumber());
        pagedPurchasesResponse.setPageSize(purchasePage.getSize());
        pagedPurchasesResponse.setTotalRecords(purchasePage.getTotalElements());
        pagedPurchasesResponse.setTotalPages(purchasePage.getTotalPages());
        pagedPurchasesResponse.setPurchases(purchases);

        return pagedPurchasesResponse;
    }

    @Override
    @Transactional
    public PurchaseDetailDTO getPurchaseById(Long id) {
        Purchase foundPurchase = purchaseRepository.getPurchaseById(id);
        List<PurchaseDetail> foundPurchaseDetails = purchaseDetailRepository.getAllPurchaseDetails(id);
        return purchaseMapper.purchaseDetailToDTO(foundPurchase, foundPurchaseDetails);
    }
}
