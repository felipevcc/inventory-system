package com.inventorysystem.Backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
@Table(name = "purchase_detail")
public class PurchaseDetail {
    @Id
    @ManyToOne
    @JoinColumn(name = "purchase_id")
    private Purchase purchase;

    @Id
    @ManyToOne
    @JoinColumn(name = "article_id")
    private Article article;

    @Column(name = "article_quantity")
    private int articleQuantity;

    @Column(name = "price")
    private int price;
}
