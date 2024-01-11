package com.inventorysystem.Backend.dto.sale;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaleCreationDTO {
    private Long customerId;
    private List<SaleCreationArticleDTO> articles;
    private Long sessionUserId;
}
