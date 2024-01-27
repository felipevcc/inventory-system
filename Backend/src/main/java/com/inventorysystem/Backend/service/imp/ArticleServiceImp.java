package com.inventorysystem.Backend.service.imp;

import com.inventorysystem.Backend.dto.article.ArticleCreationDTO;
import com.inventorysystem.Backend.dto.article.ArticleDTO;
import com.inventorysystem.Backend.dto.article.ArticleUpdateDTO;
import com.inventorysystem.Backend.dto.article.ArticlesPageDTO;
import com.inventorysystem.Backend.mapper.ArticleMapper;
import com.inventorysystem.Backend.model.Article;
import com.inventorysystem.Backend.repository.ArticleRepository;
import com.inventorysystem.Backend.repository.specifications.ArticleSpecifications;
import com.inventorysystem.Backend.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArticleServiceImp implements ArticleService {

    @Autowired
    ArticleRepository articleRepository;

    @Autowired
    ArticleMapper articleMapper;

    @Override
    @Transactional
    public ArticleDTO createArticle(ArticleCreationDTO article) {
        Long newArticleId = articleRepository.createArticle(
                article.getName(),
                article.getBrand(),
                article.getStock(),
                article.getPurchasePrice(),
                article.getSalePrice(),
                article.getWeight(),
                article.getProviderId(),
                article.getCategoryId()
        );
        return getArticleById(newArticleId);
    }

    @Override
    @Transactional
    public ArticlesPageDTO getAllArticles(Long providerId, String criteria, Integer page, Integer pageSize) {
        ArticlesPageDTO pagedArticlesResponse = new ArticlesPageDTO();

        Page<Article> articlePage;

        if (providerId == null && (criteria == null || criteria.length() == 0)) {
            Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("articleId").descending());
            articlePage = articleRepository.findAll(pageable);
        } else if (providerId != null && (criteria == null || criteria.length() == 0)) {
            Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("article_id").descending());
            articlePage = articleRepository.findAllArticlesByProvider(providerId, pageable);
        } else if (providerId != null && criteria != null && criteria.length() > 0) {
            Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("article_id").descending());
            articlePage = articleRepository.findAllArticlesByProviderAndTerm(providerId, criteria, pageable);
        } else {
            Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("articleId").descending());
            articlePage = articleRepository.findAll(ArticleSpecifications.searchArticles(criteria), pageable);
        }

        List<ArticleDTO> articles = articlePage.getContent().stream()
                .map(article -> articleMapper.articleToDTO(article))
                .collect(Collectors.toList());

        pagedArticlesResponse.setPage(articlePage.getNumber() + 1);
        pagedArticlesResponse.setPageSize(articlePage.getSize());
        pagedArticlesResponse.setTotalRecords(articlePage.getTotalElements());
        pagedArticlesResponse.setTotalPages(articlePage.getTotalPages());
        if (pagedArticlesResponse.getTotalPages() == 0) {
            pagedArticlesResponse.setTotalPages(1);
        }
        pagedArticlesResponse.setArticles(articles);

        return pagedArticlesResponse;
    }

    @Override
    @Transactional
    public ArticleDTO getArticleById(Long id) {
        Article foundArticle = articleRepository.getArticleById(id);
        return articleMapper.articleToDTO(foundArticle);
    }

    @Override
    @Transactional
    public ArticleDTO updateArticle(Long articleId, ArticleUpdateDTO articleData) {
        Article foundArticle = articleRepository.getArticleById(articleId);

        if (!articleData.getName().equalsIgnoreCase(foundArticle.getName()) &&
            articleRepository.findByName(articleData.getName()) != null) {
            System.out.println("El nombre no está disponible");
            return null;
        }

        foundArticle.setName(articleData.getName());
        foundArticle.setBrand(articleData.getBrand());
        foundArticle.setStock(articleData.getStock());
        foundArticle.setPurchasePrice(articleData.getPurchasePrice());
        foundArticle.setSalePrice(articleData.getSalePrice());
        foundArticle.setWeight(articleData.getWeight());
        foundArticle.setProviderId(articleData.getProviderId());
        foundArticle.setCategoryId(articleData.getCategoryId());

        articleRepository.updateArticle(
                foundArticle.getArticleId(),
                foundArticle.getName(),
                foundArticle.getBrand(),
                foundArticle.getStock(),
                foundArticle.getPurchasePrice(),
                foundArticle.getSalePrice(),
                foundArticle.getWeight(),
                foundArticle.getProviderId(),
                foundArticle.getCategoryId()
        );

        // Call class method for get by article id
        return getArticleById(foundArticle.getArticleId());
    }
}
