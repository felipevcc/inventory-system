package com.inventorysystem.Backend.dto.sale;

import com.inventorysystem.Backend.dto.customer.CustomerDTO;
import com.inventorysystem.Backend.dto.user.UserDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class SaleDetailDTO extends SaleDTO {
    private List<SaleArticleDTO> saleArticles;

    public SaleDetailDTO(Long saleId, Integer totalValue, String createdAt, CustomerDTO customer, UserDTO user, List<SaleArticleDTO> saleArticles) {
        super(saleId, totalValue, createdAt, customer, user);
        this.saleArticles = saleArticles;
    }
}
