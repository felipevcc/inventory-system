package com.inventorysystem.Backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
@Table(name = "sale_detail")
@IdClass(SaleArticleId.class)
public class SaleDetail {
    @Id
    @Column(name = "sale_id")
    private Long saleId;

    @Id
    @Column(name = "article_id")
    private Long articleId;

    @Column(name = "article_quantity")
    private Integer articleQuantity;

    @Column(name = "price")
    private Integer price;
}
