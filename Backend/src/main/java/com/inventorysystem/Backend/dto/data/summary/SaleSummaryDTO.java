package com.inventorysystem.Backend.dto.data.summary;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaleSummaryDTO {
    private Long totalSales;

    private Long totalSalesInLastWeek;
    private Long saleMoneyInLastWeek;

    private Long totalSalesInLastMonth;
    private Long saleMoneyInLastMonth;

    private Long totalSalesInLastYear;
    private Long saleMoneyInLastYear;
}
