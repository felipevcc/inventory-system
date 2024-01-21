package com.inventorysystem.Backend.dto.data.summary;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArticleSummaryDTO {
    private Long totalArticles;
    private Long totalStock;
}
