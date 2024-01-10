package com.inventorysystem.Backend.dto.sale;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.inventorysystem.Backend.dto.customer.CustomerDTO;
import com.inventorysystem.Backend.dto.user.UserDTO;
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
    private String createdAt;
    private CustomerDTO customer;
    private UserDTO user;
}
