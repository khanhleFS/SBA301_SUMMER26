package com.fpt.sba301_su26_groupproject.service.impl;

import com.fpt.sba301_su26_groupproject.dto.category.CategoryRequestDTO;
import com.fpt.sba301_su26_groupproject.dto.category.CategoryResponseDTO;
import com.fpt.sba301_su26_groupproject.entity.Category;
import com.fpt.sba301_su26_groupproject.repository.CategoryRepository;
import com.fpt.sba301_su26_groupproject.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    @Transactional(readOnly = true)
    public List<CategoryResponseDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public CategoryResponseDTO getCategoryById(UUID id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Thể loại không tồn tại."));
        return mapToResponseDTO(category);
    }

    @Override
    @Transactional
    public CategoryResponseDTO createCategory(CategoryRequestDTO request) {
        if (categoryRepository.existsByNameIgnoreCase(request.name())) {
            throw new IllegalArgumentException("Thể loại '" + request.name() + "' đã tồn tại.");
        }
        Category category = new Category();
        category.setName(request.name());
        category.setSlug(generateSlug(request.name()));
        Category savedCategory = categoryRepository.save(category);
        return mapToResponseDTO(savedCategory);
    }

    @Override
    @Transactional
    public CategoryResponseDTO updateCategory(UUID id, CategoryRequestDTO request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Thể loại không tồn tại."));
        if (categoryRepository.existsByNameIgnoreCaseAndIdNot(request.name(), id)) {
            throw new IllegalArgumentException("Thể loại '" + request.name() + "' đã tồn tại.");
        }
        category.setName(request.name());
        category.setSlug(generateSlug(request.name()));
        Category updatedCategory = categoryRepository.save(category);
        return mapToResponseDTO(updatedCategory);
    }

    @Override
    @Transactional
    public void deleteCategory(UUID id) {
        if (!categoryRepository.existsById(id)) {
            throw new RuntimeException("Thể loại không tồn tại.");
        }
        categoryRepository.deleteById(id);
    }

    private CategoryResponseDTO mapToResponseDTO(Category category) {
        return new CategoryResponseDTO(
                category.getId(),
                category.getName(),
                category.getSlug()
        );
    }

    private String generateSlug(String name) {
        if (name == null) return "";
        String normalized = java.text.Normalizer.normalize(name, java.text.Normalizer.Form.NFD);
        String noDiacritics = normalized.replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
        return noDiacritics.toLowerCase()
                .replaceAll("đ", "d")
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("(^-|-$)", "");
    }
}
