package com.inventorysystem.Backend.service.imp;

import com.inventorysystem.Backend.dto.sale.SaleCreationDTO;
import com.inventorysystem.Backend.dto.sale.SaleDTO;
import com.inventorysystem.Backend.dto.sale.SaleDetailDTO;
import com.inventorysystem.Backend.dto.sale.SalesPageDTO;
import com.inventorysystem.Backend.mapper.SaleMapper;
import com.inventorysystem.Backend.model.Article;
import com.inventorysystem.Backend.model.Sale;
import com.inventorysystem.Backend.model.SaleDetail;
import com.inventorysystem.Backend.repository.ArticleRepository;
import com.inventorysystem.Backend.repository.SaleDetailRepository;
import com.inventorysystem.Backend.repository.SaleRepository;
import com.inventorysystem.Backend.service.SaleService;
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
public class SaleServiceImp implements SaleService {

    @Autowired
    SaleRepository saleRepository;

    @Autowired
    SaleDetailRepository saleDetailRepository;

    @Autowired
    ArticleRepository articleRepository;

    @Autowired
    SaleMapper saleMapper;

    @Override
    @Transactional
    public SaleDetailDTO createSale(SaleCreationDTO sale) {
        if (sale.getArticlesIds().isEmpty()) {
            System.out.println("Se requiere al menos un artículo en la venta");
            return null;
        }

        List<Long> validArticles = new ArrayList<>();
        Long totalSalePrice = 0L;
        for (Long articleId:sale.getArticlesIds()) {
            if (!articleRepository.existsById(articleId) || validArticles.contains(articleId)) {
                continue;
            }
            // Add valid id
            validArticles.add(articleId);
            // Add price to the total value of the sale
            Article foundArticle = articleRepository.getArticleById(articleId);
            totalSalePrice += foundArticle.getSalePrice();
        }

        if (validArticles.isEmpty()) {
            System.out.println("Ningún artículo existente");
            return null;
        }

        Long newSaleId = saleRepository.createSale(
                totalSalePrice,
                sale.getCustomerId(),
                sale.getSessionUserId()
        );
        return getSaleById(newSaleId);
    }

    @Override
    @Transactional
    public SalesPageDTO getAllSales(String criteria, Integer page, Integer pageSize) {
        SalesPageDTO pagedSalesResponse = new SalesPageDTO();

        Page<Sale> salePage;

        if (criteria == null || criteria.length() == 0) {
            Pageable pageable = PageRequest.of(page, pageSize, Sort.by("saleId").descending());
            salePage = saleRepository.findAll(pageable);
        } else {
            Pageable pageable = PageRequest.of(page, pageSize, Sort.by("sale_id").descending()); // sale_id because it is a native query
            salePage = saleRepository.findAllSales(criteria, pageable);
        }

        List<SaleDTO> sales = salePage.getContent().stream()
                .map(sale -> saleMapper.saleToDTO(sale))
                .collect(Collectors.toList());

        pagedSalesResponse.setPage(salePage.getNumber());
        pagedSalesResponse.setPageSize(salePage.getSize());
        pagedSalesResponse.setTotalRecords(salePage.getTotalElements());
        pagedSalesResponse.setTotalPages(salePage.getTotalPages());
        pagedSalesResponse.setSales(sales);

        return pagedSalesResponse;
    }

    @Override
    @Transactional
    public SaleDetailDTO getSaleById(Long id) {
        Sale foundSale = saleRepository.getSaleById(id);
        List<SaleDetail> foundSaleDetails = saleDetailRepository.getAllSaleDetails(id);
        return saleMapper.saleDetailToDTO(foundSale, foundSaleDetails);
    }
}
