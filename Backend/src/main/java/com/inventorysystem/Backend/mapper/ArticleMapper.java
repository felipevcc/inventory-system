package com.inventorysystem.Backend.mapper;

import com.inventorysystem.Backend.dto.ArticleDTO;
import com.inventorysystem.Backend.model.Article;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ArticleMapper {
    @Autowired
    ModelMapper modelMapper;

    public ArticleDTO articleToDTO(Article article) {
        return modelMapper.map(article, ArticleDTO.class);
    }
}
