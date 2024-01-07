package com.inventorysystem.Backend.service;

import com.inventorysystem.Backend.dto.category.CategoriesPageDTO;
import com.inventorysystem.Backend.dto.category.CategoryCreationDTO;
import com.inventorysystem.Backend.dto.category.CategoryDTO;
import com.inventorysystem.Backend.dto.category.CategoryUpdateDTO;

public interface CategoryService {

    CategoryDTO createCategory(CategoryCreationDTO category);

    CategoriesPageDTO getAllCategories(String criteria, Integer page, Integer pageSize);

    CategoryDTO getCategoryById(Long id);

    CategoryDTO updateCategory(Long categoryId, CategoryUpdateDTO categoryData);
}
