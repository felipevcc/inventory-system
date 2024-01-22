package com.inventorysystem.Backend.service.imp;

import com.inventorysystem.Backend.dto.data.DataSummaryDTO;
import com.inventorysystem.Backend.dto.data.summary.*;
import com.inventorysystem.Backend.repository.*;
import com.inventorysystem.Backend.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DataServiceImp implements DataService {

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ArticleRepository articleRepository;

    @Autowired
    ProviderRepository providerRepository;

    @Autowired
    PurchaseRepository purchaseRepository;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    SaleRepository saleRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public DataSummaryDTO getDataSummary() {
        DataSummaryDTO dataSummary = new DataSummaryDTO();
        dataSummary.setCategories(getCategorySummary());
        dataSummary.setArticles(getArticleSummary());
        dataSummary.setProviders(getProviderSummary());
        dataSummary.setPurchases(getPurchaseSummary());
        dataSummary.setCustomers(getCustomerSummary());
        dataSummary.setSales(getSaleSummary());
        dataSummary.setUsers(getUserSummary());
        return dataSummary;
    }

    public CategorySummaryDTO getCategorySummary() {
        CategorySummaryDTO categorySummary = new CategorySummaryDTO();
        categorySummary.setTotalCategories(categoryRepository.count());
        return categorySummary;
    }

    public ArticleSummaryDTO getArticleSummary() {
        ArticleSummaryDTO articleSummary = new ArticleSummaryDTO();
        articleSummary.setTotalArticles(articleRepository.count());
        articleSummary.setTotalStock(articleRepository.getTotalStock());
        return articleSummary;
    }

    public ProviderSummaryDTO getProviderSummary() {
        ProviderSummaryDTO providerSummary = new ProviderSummaryDTO();
        providerSummary.setTotalProviders(providerRepository.count());
        return providerSummary;
    }

    public PurchaseSummaryDTO getPurchaseSummary() {
        PurchaseSummaryDTO purchaseSummary = new PurchaseSummaryDTO();
        purchaseSummary.setTotalPurchases(purchaseRepository.count());

        purchaseSummary.setTotalPurchasesInLastWeek(purchaseRepository.getTotalPurchasesInLastWeek());
        purchaseSummary.setPurchaseMoneyInLastWeek(purchaseRepository.getPurchaseMoneyInLastWeek());

        purchaseSummary.setTotalPurchasesInLastMonth(purchaseRepository.getTotalPurchasesInLastMonth());
        purchaseSummary.setPurchaseMoneyInLastMonth(purchaseRepository.getPurchaseMoneyInLastMonth());

        purchaseSummary.setTotalPurchasesInLastYear(purchaseRepository.getTotalPurchasesInLastYear());
        purchaseSummary.setPurchaseMoneyInLastYear(purchaseRepository.getPurchaseMoneyInLastYear());
        return purchaseSummary;
    }

    public CustomerSummaryDTO getCustomerSummary() {
        CustomerSummaryDTO customerSummary = new CustomerSummaryDTO();
        customerSummary.setTotalCustomers(customerRepository.count());
        return customerSummary;
    }

    public SaleSummaryDTO getSaleSummary() {
        SaleSummaryDTO saleSummary = new SaleSummaryDTO();
        saleSummary.setTotalSales(saleRepository.count());

        saleSummary.setTotalSalesInLastWeek(saleRepository.getTotalSalesInLastWeek());
        saleSummary.setSaleMoneyInLastWeek(saleRepository.getSaleMoneyInLastWeek());

        saleSummary.setTotalSalesInLastMonth(saleRepository.getTotalSalesInLastMonth());
        saleSummary.setSaleMoneyInLastMonth(saleRepository.getSaleMoneyInLastMonth());

        saleSummary.setTotalSalesInLastYear(saleRepository.getTotalSalesInLastYear());
        saleSummary.setSaleMoneyInLastYear(saleRepository.getSaleMoneyInLastYear());
        return saleSummary;
    }

    public UserSummaryDTO getUserSummary() {
        UserSummaryDTO userSummary = new UserSummaryDTO();
        userSummary.setTotalUsers(userRepository.count());
        userSummary.setTotalAdminUsers(userRepository.countByAdminIsTrue());
        return userSummary;
    }
}
