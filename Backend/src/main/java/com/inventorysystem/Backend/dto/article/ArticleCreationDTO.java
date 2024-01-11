package com.inventorysystem.Backend.dto.article;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArticleCreationDTO {
    private String name;
    private String brand;
    private Integer stock;
    private Integer purchasePrice;
    private Integer salePrice;
    private String weight;
    private Long providerId;
    private Long categoryId;
}
