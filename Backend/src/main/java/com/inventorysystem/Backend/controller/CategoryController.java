package com.inventorysystem.Backend.controller;

import com.inventorysystem.Backend.dto.category.CategoriesPageDTO;
import com.inventorysystem.Backend.dto.category.CategoryCreationDTO;
import com.inventorysystem.Backend.dto.category.CategoryDTO;
import com.inventorysystem.Backend.dto.category.CategoryUpdateDTO;
import com.inventorysystem.Backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/category")
@CrossOrigin
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @PostMapping
    ResponseEntity<CategoryDTO> createCategory(@RequestBody CategoryCreationDTO category) {
        CategoryDTO createdCategory = categoryService.createCategory(category);
        return ResponseEntity.status(HttpStatus.OK).body(createdCategory);
    }

    @GetMapping
    ResponseEntity<CategoriesPageDTO> getAllCategories(
            @RequestParam(name = "searchCriteria", required = false) String criteria,
            @RequestParam(name = "page") Integer page,
            @RequestParam(name = "pageSize") Integer pageSize
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.getAllCategories(criteria, page, pageSize));
    }

    @GetMapping("/{id}")
    ResponseEntity<CategoryDTO> getCategoryById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.getCategoryById(id));
    }

    @PutMapping("/{id}")
    ResponseEntity<CategoryDTO> updateCategory(@PathVariable Long id, @RequestBody CategoryUpdateDTO categoryData) {
        CategoryDTO updatedCategory = categoryService.updateCategory(id, categoryData);
        return ResponseEntity.status(HttpStatus.OK).body(updatedCategory);
    }
}
