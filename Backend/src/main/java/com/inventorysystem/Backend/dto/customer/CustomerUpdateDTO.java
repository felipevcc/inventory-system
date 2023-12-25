package com.inventorysystem.Backend.dto.customer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerUpdateDTO {
    private String phoneNumber;
    private String email;
    private String address;
    private String state;
    private String city;
}
