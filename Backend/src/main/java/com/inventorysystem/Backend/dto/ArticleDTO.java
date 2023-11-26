package com.inventorysystem.Backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
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
public class ArticleDTO {private Long articleId;
    private String name;
    private String brand;
    private Integer stock;
    private Integer purchasePrice;
    private Integer salePrice;
    private String weight;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long providerId;
    private Long categoryId;
}
