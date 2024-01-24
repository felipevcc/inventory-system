package com.inventorysystem.Backend.dto.data.summary;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseSummaryDTO {
    private Long totalPurchases;

    private Long totalPurchasesInLastWeek;
    private Long purchaseMoneyInLastWeek;

    private Long totalPurchasesInLastMonth;
    private Long purchaseMoneyInLastMonth;

    private Long totalPurchasesInLastYear;
    private Long purchaseMoneyInLastYear;
}
