package com.inventorysystem.Backend.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class UserDTO {
    private Long userId;
    private String name;
    private String username;
    private String phoneNumber;
    private String email;
    private Boolean admin;
}
