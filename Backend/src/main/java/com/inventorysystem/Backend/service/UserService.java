package com.inventorysystem.Backend.service;

import com.inventorysystem.Backend.dto.UserCreationDTO;
import com.inventorysystem.Backend.dto.UserDTO;
import com.inventorysystem.Backend.dto.UsersPageDTO;
import com.inventorysystem.Backend.model.User;

import java.util.List;

public interface UserService {

    UserDTO createUser(UserCreationDTO userData);

    UserDTO userLogin(String userEmail, String userPassword);

    UserDTO getUserById(Long id);

    UsersPageDTO getAllUsers(Integer page, Integer pageSize);
}
