package com.inventorysystem.Backend.dto;

import com.inventorysystem.Backend.model.Article;
import com.inventorysystem.Backend.model.Sale;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaleDetailDTO {
    private Long saleId;
    private Long articleId;
    private Integer articleQuantity;
    private Integer price;
}
