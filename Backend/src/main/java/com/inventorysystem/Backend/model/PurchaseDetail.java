package com.inventorysystem.Backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
@Table(name = "purchase_detail")
@IdClass(PurchaseArticleId.class)
public class PurchaseDetail {
    @Id
    @Column(name = "purchase_id")
    private Long purchaseId;
    @Id
    @Column(name = "article_id")
    private Long articleId;

    @Column(name = "article_quantity")
    private Integer articleQuantity;

    @Column(name = "price")
    private Integer price;
}
