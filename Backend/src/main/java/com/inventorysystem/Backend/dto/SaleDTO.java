package com.inventorysystem.Backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.inventorysystem.Backend.model.Customer;
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
public class SaleDTO {
    private Long saleId;
    private Integer totalValue;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long customerId;
    private Long userId;
}
