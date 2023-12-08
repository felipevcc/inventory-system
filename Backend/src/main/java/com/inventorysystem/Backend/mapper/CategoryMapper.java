package com.inventorysystem.Backend.mapper;

import com.inventorysystem.Backend.dto.CategoryDTO;
import com.inventorysystem.Backend.model.Category;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CategoryMapper {
    @Autowired
    ModelMapper modelMapper;

    public CategoryDTO categoryToDTO(Category category) {
        return modelMapper.map(category, CategoryDTO.class);
    }
}
