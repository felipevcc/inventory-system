package com.inventorysystem.Backend.dto.purchase;

import com.inventorysystem.Backend.dto.article.ArticleDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseArticleDTO {
    private ArticleDTO article;
    private Integer articleQuantity;
    private Integer price;
}
