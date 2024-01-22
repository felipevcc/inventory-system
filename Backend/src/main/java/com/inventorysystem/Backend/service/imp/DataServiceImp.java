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

        Long totalPurchasesInLastWeek = purchaseRepository.getTotalPurchasesInLastWeek();
        purchaseSummary.setTotalPurchasesInLastWeek(totalPurchasesInLastWeek);
        purchaseSummary.setPurchaseMoneyInLastWeek(totalPurchasesInLastWeek > 0 ? purchaseRepository.getPurchaseMoneyInLastWeek() : 0);

        Long totalPurchasesInLastMonth = purchaseRepository.getTotalPurchasesInLastMonth();
        purchaseSummary.setTotalPurchasesInLastMonth(totalPurchasesInLastMonth);
        purchaseSummary.setPurchaseMoneyInLastMonth(totalPurchasesInLastMonth > 0 ?purchaseRepository.getPurchaseMoneyInLastMonth() : 0);

        Long totalPurchasesInLastYear = purchaseRepository.getTotalPurchasesInLastYear();
        purchaseSummary.setTotalPurchasesInLastYear(totalPurchasesInLastYear);
        purchaseSummary.setPurchaseMoneyInLastYear(totalPurchasesInLastYear > 0 ? purchaseRepository.getPurchaseMoneyInLastYear() : 0);
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

        Long totalSalesInLastWeek = saleRepository.getTotalSalesInLastWeek();
        saleSummary.setTotalSalesInLastWeek(totalSalesInLastWeek);
        saleSummary.setSaleMoneyInLastWeek(totalSalesInLastWeek > 0 ? saleRepository.getSaleMoneyInLastWeek() : 0);

        Long totalSalesInLastMonth = saleRepository.getTotalSalesInLastMonth();
        saleSummary.setTotalSalesInLastMonth(totalSalesInLastMonth);
        saleSummary.setSaleMoneyInLastMonth(totalSalesInLastMonth > 0 ? saleRepository.getSaleMoneyInLastMonth() : 0);

        Long totalSalesInLastYear = saleRepository.getTotalSalesInLastYear();
        saleSummary.setTotalSalesInLastYear(totalSalesInLastYear);
        saleSummary.setSaleMoneyInLastYear(totalSalesInLastYear > 0 ? saleRepository.getSaleMoneyInLastYear() : 0);
        return saleSummary;
    }

    public UserSummaryDTO getUserSummary() {
        UserSummaryDTO userSummary = new UserSummaryDTO();
        userSummary.setTotalUsers(userRepository.count());
        userSummary.setTotalAdminUsers(userRepository.countByAdminIsTrue());
        return userSummary;
    }
}
