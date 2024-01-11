package com.inventorysystem.Backend.dto.sale;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaleCreationArticleDTO {
    private Long articleId;
    private Integer articleQuantity;
}
