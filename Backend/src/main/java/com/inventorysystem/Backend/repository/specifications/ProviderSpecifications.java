package com.inventorysystem.Backend.repository.specifications;

import com.inventorysystem.Backend.model.Provider;
import org.springframework.data.jpa.domain.Specification;

public class ProviderSpecifications {

    public static Specification<Provider> searchProviders(String searchTerm) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.or(
                criteriaBuilder.equal(root.get("providerId").as(String.class), searchTerm),
                criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + searchTerm.toLowerCase() + "%"),
                criteriaBuilder.like(criteriaBuilder.lower(root.get("phoneNumber")), "%" + searchTerm.toLowerCase() + "%"),
                criteriaBuilder.like(criteriaBuilder.lower(root.get("email")), "%" + searchTerm.toLowerCase() + "%")
        );
    }
}
