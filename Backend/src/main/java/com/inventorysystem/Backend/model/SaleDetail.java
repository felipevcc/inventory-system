package com.inventorysystem.Backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
@Table(name = "sale_detail")
public class SaleDetail {
    @Id
    @ManyToOne
    @JoinColumn(name = "sale_id")
    private Sale sale;

    @Id
    @ManyToOne
    @JoinColumn(name = "article_id")
    private Article article;

    @Column(name = "article_quantity")
    private Integer articleQuantity;

    @Column(name = "price")
    private Integer price;
}
