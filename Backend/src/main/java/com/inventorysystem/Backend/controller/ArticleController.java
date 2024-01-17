package com.inventorysystem.Backend.controller;

import com.inventorysystem.Backend.dto.article.ArticleCreationDTO;
import com.inventorysystem.Backend.dto.article.ArticleDTO;
import com.inventorysystem.Backend.dto.article.ArticleUpdateDTO;
import com.inventorysystem.Backend.dto.article.ArticlesPageDTO;
import com.inventorysystem.Backend.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/article")
@CrossOrigin
public class ArticleController {

    @Autowired
    ArticleService articleService;

    @PostMapping
    ResponseEntity<ArticleDTO> createArticle(@RequestBody ArticleCreationDTO article) {
        ArticleDTO createdArticle = articleService.createArticle(article);
        return ResponseEntity.status(HttpStatus.OK).body(createdArticle);
    }

    @GetMapping
    ResponseEntity<ArticlesPageDTO> getAllArticles(
            @RequestParam(name = "providerId", required = false) Long providerId,
            @RequestParam(name = "searchCriteria", required = false) String criteria,
            @RequestParam(name = "page") Integer page,
            @RequestParam(name = "pageSize") Integer pageSize
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(articleService.getAllArticles(providerId, criteria, page, pageSize));
    }

    @GetMapping("/{id}")
    ResponseEntity<ArticleDTO> getArticleById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(articleService.getArticleById(id));
    }

    @PutMapping("/{id}")
    ResponseEntity<ArticleDTO> updateArticle(@PathVariable Long id, @RequestBody ArticleUpdateDTO articleData) {
        ArticleDTO updatedArticle = articleService.updateArticle(id, articleData);
        return ResponseEntity.status(HttpStatus.OK).body(updatedArticle);
    }
}
