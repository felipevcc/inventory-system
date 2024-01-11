package com.inventorysystem.Backend.service;

import com.inventorysystem.Backend.dto.article.ArticleCreationDTO;
import com.inventorysystem.Backend.dto.article.ArticleDTO;
import com.inventorysystem.Backend.dto.article.ArticleUpdateDTO;
import com.inventorysystem.Backend.dto.article.ArticlesPageDTO;

public interface ArticleService {

    ArticleDTO createArticle(ArticleCreationDTO article);

    ArticlesPageDTO getAllArticles(Long providerId, String criteria, Integer page, Integer pageSize);

    ArticleDTO getArticleById(Long id);

    ArticleDTO updateArticle(Long articleId, ArticleUpdateDTO articleData);
}
