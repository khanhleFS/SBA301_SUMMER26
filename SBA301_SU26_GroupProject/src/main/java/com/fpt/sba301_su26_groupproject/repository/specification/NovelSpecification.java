package com.fpt.sba301_su26_groupproject.repository.specification;

import com.fpt.sba301_su26_groupproject.entity.*;
import com.fpt.sba301_su26_groupproject.entity.Enumeration.NovelStatus;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class NovelSpecification {

    public static Specification<Novel> filterNovels(
            String title,
            NovelStatus status,
            String categoryName,
            Integer minChapters) {

        return (Root<Novel> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // 1. Filter by Title (case-insensitive contains)
            if (title != null && !title.isBlank()) {
                predicates.add(cb.like(cb.lower(root.get("title")), "%" + title.trim().toLowerCase() + "%"));
            }

            // 2. Filter by Status
            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }

            // 3. Filter by Category Name (using subquery: NovelCategory -> Category)
            if (categoryName != null && !categoryName.isBlank()) {
                Subquery<UUID> subquery = query.subquery(UUID.class);
                Root<NovelCategory> subRoot = subquery.from(NovelCategory.class);
                Join<NovelCategory, Category> categoryJoin = subRoot.join("category");

                subquery.select(subRoot.get("id").get("novelId"))
                        .where(cb.equal(cb.lower(categoryJoin.get("name")), categoryName.trim().toLowerCase()));

                predicates.add(root.get("id").in(subquery));
            }

            // 4. Filter by Minimum Chapters (using subquery to count chapters per novel)
            if (minChapters != null && minChapters > 0) {
                Subquery<Long> subquery = query.subquery(Long.class);
                Root<Chapter> subRoot = subquery.from(Chapter.class);
                subquery.select(cb.count(subRoot))
                        .where(cb.equal(subRoot.get("novel").get("id"), root.get("id")));
                
                predicates.add(cb.ge(subquery, minChapters.longValue()));
            }

            // Ensure distinct results (especially useful when joins are involved)
            query.distinct(true);

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
