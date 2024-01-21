package com.inventorysystem.Backend.service.imp;

import com.inventorysystem.Backend.dto.data.DataSummaryDTO;
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
        return dataSummary;
    }
}
