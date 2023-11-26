package com.inventorysystem.Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProviderDTO {
    private Long providerId;
    private String name;
    private String phoneNumber;
    private String email;
}
