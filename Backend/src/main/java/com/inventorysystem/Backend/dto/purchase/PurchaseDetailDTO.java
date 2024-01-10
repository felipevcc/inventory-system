package com.inventorysystem.Backend.dto.purchase;

import com.inventorysystem.Backend.dto.provider.ProviderDTO;
import com.inventorysystem.Backend.dto.user.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class PurchaseDetailDTO extends PurchaseDTO {
    private List<PurchaseArticleDTO> purchaseArticles;

    public PurchaseDetailDTO(Long purchaseId, Integer totalValue, String createdAt, ProviderDTO provider, UserDTO user, List<PurchaseArticleDTO> purchaseArticles) {
        super(purchaseId, totalValue, createdAt, provider, user);
        this.purchaseArticles = purchaseArticles;
    }
}
