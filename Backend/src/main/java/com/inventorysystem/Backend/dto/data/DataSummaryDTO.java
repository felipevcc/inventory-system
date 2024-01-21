package com.inventorysystem.Backend.dto.data;

import com.inventorysystem.Backend.dto.data.summary.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DataSummaryDTO {
    private CategorySummaryDTO categories;
    private ArticleSummaryDTO articles;
    private ProviderSummaryDTO providers;
    private PurchaseSummaryDTO purchases;
    private CustomerSummaryDTO customers;
    private SaleSummaryDTO sales;
    private UserSummaryDTO users;
}
