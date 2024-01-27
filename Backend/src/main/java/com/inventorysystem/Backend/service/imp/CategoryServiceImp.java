package com.inventorysystem.Backend.service.imp;

import com.inventorysystem.Backend.dto.category.CategoriesPageDTO;
import com.inventorysystem.Backend.dto.category.CategoryCreationDTO;
import com.inventorysystem.Backend.dto.category.CategoryDTO;
import com.inventorysystem.Backend.dto.category.CategoryUpdateDTO;
import com.inventorysystem.Backend.mapper.CategoryMapper;
import com.inventorysystem.Backend.model.Category;
import com.inventorysystem.Backend.repository.CategoryRepository;
import com.inventorysystem.Backend.repository.specifications.CategorySpecifications;
import com.inventorysystem.Backend.service.CategoryService;
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
public class CategoryServiceImp implements CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    CategoryMapper categoryMapper;

    @Override
    @Transactional
    public CategoryDTO createCategory(CategoryCreationDTO category) {
        Long newCategoryId = categoryRepository.createCategory(
                category.getName()
        );
        return getCategoryById(newCategoryId);
    }

    @Override
    @Transactional
    public CategoriesPageDTO getAllCategories(String criteria, Integer page, Integer pageSize) {
        CategoriesPageDTO pagedCategoriesResponse = new CategoriesPageDTO();

        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("categoryId").descending());

        Page<Category> categoryPage;

        if (criteria == null || criteria.length() == 0) {
            categoryPage = categoryRepository.findAll(pageable);
        } else {
            categoryPage = categoryRepository.findAll(CategorySpecifications.searchCategories(criteria), pageable);
        }

        List<CategoryDTO> categories = categoryPage.getContent().stream()
                .map(category -> categoryMapper.categoryToDTO(category))
                .collect(Collectors.toList());

        pagedCategoriesResponse.setPage(categoryPage.getNumber() + 1);
        pagedCategoriesResponse.setPageSize(categoryPage.getSize());
        pagedCategoriesResponse.setTotalRecords(categoryPage.getTotalElements());
        pagedCategoriesResponse.setTotalPages(categoryPage.getTotalPages());
        if (pagedCategoriesResponse.getTotalPages() == 0) {
            pagedCategoriesResponse.setTotalPages(1);
        }
        pagedCategoriesResponse.setCategories(categories);

        return pagedCategoriesResponse;
    }

    @Override
    @Transactional
    public CategoryDTO getCategoryById(Long id) {
        Category foundCategory = categoryRepository.getCategoryById(id);
        return categoryMapper.categoryToDTO(foundCategory);
    }

    @Override
    @Transactional
    public CategoryDTO updateCategory(Long categoryId, CategoryUpdateDTO categoryData) {
        Category foundCategory = categoryRepository.getCategoryById(categoryId);

        if (!categoryData.getName().equalsIgnoreCase(foundCategory.getName()) &&
            categoryRepository.findByName(categoryData.getName()) != null) {
            System.out.println("El nombre no está disponible");
            return null;
        }

        foundCategory.setName(categoryData.getName());

        categoryRepository.updateCategory(
                foundCategory.getCategoryId(),
                foundCategory.getName()
        );

        // Call class method for get by category id
        return getCategoryById(foundCategory.getCategoryId());
    }
}
