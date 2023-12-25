package com.inventorysystem.Backend.service;

import com.inventorysystem.Backend.dto.user.UserCreationDTO;
import com.inventorysystem.Backend.dto.user.UserDTO;
import com.inventorysystem.Backend.dto.user.UserUpdateDTO;
import com.inventorysystem.Backend.dto.user.UsersPageDTO;

public interface UserService {

    UserDTO userLogin(String userEmail, String userPassword);

    UserDTO getUserById(Long id);

    UsersPageDTO getAllUsers(String criteria, Integer page, Integer pageSize);

    UserDTO createUser(UserCreationDTO userData);

    UserDTO updateUser(Long userId, UserUpdateDTO userData);

    UserDTO updatePassword(Long userId, String newPassword);
}
