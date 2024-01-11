package com.inventorysystem.Backend.dto.purchase;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseCreationArticleDTO {
    private Long articleId;
    private Integer articleQuantity;
}
