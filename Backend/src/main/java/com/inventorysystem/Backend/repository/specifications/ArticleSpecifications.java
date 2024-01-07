package com.inventorysystem.Backend.repository.specifications;

import com.inventorysystem.Backend.model.Article;
import org.springframework.data.jpa.domain.Specification;

public class ArticleSpecifications {

    public static Specification<Article> searchArticles(String searchTerm) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.or(
                criteriaBuilder.equal(root.get("articleId").as(String.class), searchTerm),
                criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + searchTerm.toLowerCase() + "%"),
                criteriaBuilder.like(criteriaBuilder.lower(root.get("brand")), "%" + searchTerm.toLowerCase() + "%")
        );
    }
}
