package com.inventorysystem.Backend.dto.purchase;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseCreationDTO {
    private Long providerId;
    private List<PurchaseCreationArticleDTO> articles;
    private Long sessionUserId;
}
