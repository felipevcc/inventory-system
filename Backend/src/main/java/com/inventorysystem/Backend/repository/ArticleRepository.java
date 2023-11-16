package com.inventorysystem.Backend.repository;

import com.inventorysystem.Backend.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    @Procedure(procedureName = "Proc_get_all_articles")
    List<Article> getAllArticles();

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
            @Param("Ip_provider_id") Integer providerId,
            @Param("Ip_category_id") Integer categoryId
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
            @Param("Ip_provider_id") Integer providerId,
            @Param("Ip_category_id") Integer categoryId
    );

    @Procedure(procedureName = "Proc_delete_article")
    void deleteArticle(@Param("Ip_article_id") Long articleId);
}
