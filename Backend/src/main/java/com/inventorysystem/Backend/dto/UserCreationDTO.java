package com.inventorysystem.Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserCreationDTO {
    private String name;
    private String username;
    private String password;
    private String phoneNumber;
    private String email;
    private Boolean admin;
}
