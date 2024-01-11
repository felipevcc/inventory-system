package com.inventorysystem.Backend.dto.purchase;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.inventorysystem.Backend.dto.provider.ProviderDTO;
import com.inventorysystem.Backend.dto.user.UserDTO;
import com.inventorysystem.Backend.model.Provider;
import com.inventorysystem.Backend.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseDTO {
    private Long purchaseId;
    private Integer totalValue;
    private String createdAt;
    private ProviderDTO provider;
    private UserDTO user;
}
