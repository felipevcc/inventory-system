package com.inventorysystem.Backend.service;

import com.inventorysystem.Backend.dto.UserCreationDTO;
import com.inventorysystem.Backend.dto.UserDTO;
import com.inventorysystem.Backend.dto.UserUpdateDTO;
import com.inventorysystem.Backend.dto.UsersPageDTO;
import com.inventorysystem.Backend.model.User;

import java.util.List;

public interface UserService {

    UserDTO userLogin(String userEmail, String userPassword);

    UserDTO getUserById(Long id);

    UsersPageDTO getAllUsers(String criteria, Integer page, Integer pageSize);

    UserDTO createUser(UserCreationDTO userData);

    UserDTO updateUser(Long userId, UserUpdateDTO userData);

    UserDTO updatePassword(Long userId, String newPassword);
}
