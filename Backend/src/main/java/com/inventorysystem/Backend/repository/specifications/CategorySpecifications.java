package com.inventorysystem.Backend.repository.specifications;

import com.inventorysystem.Backend.model.Category;
import org.springframework.data.jpa.domain.Specification;

public class CategorySpecifications {

    public static Specification<Category> searchCategories(String searchTerm) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.or(
                criteriaBuilder.equal(root.get("categoryId").as(String.class), searchTerm),
                criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + searchTerm.toLowerCase() + "%")
        );
    }
}
