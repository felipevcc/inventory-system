package com.inventorysystem.Backend.dto.customer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerCreationDTO {
    private String name;
    private String phoneNumber;
    private String email;
    private String document;
    private String address;
    private String state;
    private String city;
}
