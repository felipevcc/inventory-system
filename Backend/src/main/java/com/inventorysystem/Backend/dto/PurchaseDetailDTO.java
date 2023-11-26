package com.inventorysystem.Backend.dto;

import com.inventorysystem.Backend.model.Article;
import com.inventorysystem.Backend.model.Purchase;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseDetailDTO {
    private Long purchaseId;
    private Long articleId;
    private Integer articleQuantity;
    private Integer price;
}
