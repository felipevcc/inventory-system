package com.inventorysystem.Backend.dto.provider;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProviderCreationDTO {
    private String name;
    private String phoneNumber;
    private String email;
}
