package com.inventorysystem.Backend.dto.article;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.inventorysystem.Backend.dto.category.CategoryDTO;
import com.inventorysystem.Backend.dto.provider.ProviderDTO;
import com.inventorysystem.Backend.model.Category;
import com.inventorysystem.Backend.model.Provider;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArticleDTO {
    private Long articleId;
    private String name;
    private String brand;
    private Integer stock;
    private Integer purchasePrice;
    private Integer salePrice;
    private String weight;
    private ProviderDTO provider;
    private CategoryDTO category;
}
