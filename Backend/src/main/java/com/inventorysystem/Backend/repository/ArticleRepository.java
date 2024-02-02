package com.inventorysystem.Backend.repository;

import com.inventorysystem.Backend.model.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    Article findByName(String name);

    @Procedure(procedureName = "Proc_get_all_articles")
    List<Article> getAllArticles();

    @Query(nativeQuery = true, value = "SELECT * FROM article WHERE provider_id = :providerId")
    Page<Article> findAllArticlesByProvider(@Param("providerId") Long providerId, Pageable pageable);

    @Query(nativeQuery = true, value = "SELECT * FROM article " +
        "WHERE provider_id = :providerId " +
        "AND (CAST(article_id AS CHAR) = :searchTerm OR LOWER(name) LIKE %:searchTerm% OR LOWER(brand) LIKE %:searchTerm%)")
    Page<Article> findAllArticlesByProviderAndTerm(@Param("providerId") Long providerId, @Param("searchTerm") String searchTerm, Pageable pageable);

    @Procedure(procedureName = "Proc_get_article_by_id")
    Article getArticleById(@Param("Ip_article_id") Long articleId);

    @Procedure(procedureName = "Proc_insert_article", outputParameterName = "Op_article_id")
    Long createArticle(
            @Param("Ip_name") String name,
            @Param("Ip_brand") String brand,
            @Param("Ip_stock") Integer stock,
            @Param("Ip_purchase_price") Integer purchasePrice,
            @Param("Ip_sale_price") Integer salePrice,
            @Param("Ip_weight") String weight,
            @Param("Ip_provider_id") Long providerId,
            @Param("Ip_category_id") Long categoryId
    );

    @Procedure(procedureName = "Proc_update_article")
    void updateArticle(
            @Param("Ip_article_id") Long articleId,
            @Param("Ip_name") String name,
            @Param("Ip_brand") String brand,
            @Param("Ip_stock") Integer stock,
            @Param("Ip_purchase_price") Integer purchasePrice,
            @Param("Ip_sale_price") Integer salePrice,
            @Param("Ip_weight") String weight,
            @Param("Ip_provider_id") Long providerId,
            @Param("Ip_category_id") Long categoryId
    );

    @Procedure(procedureName = "Proc_delete_article")
    void deleteArticle(@Param("Ip_article_id") Long articleId);

    Page<Article> findAll(Specification<Article> articleSpecification, Pageable pageable);

    @Query("SELECT SUM(stock) FROM Article article")
    Long getTotalStock();
}
