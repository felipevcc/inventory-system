package com.inventorysystem.Backend.service;

import com.inventorysystem.Backend.dto.user.*;

public interface UserService {

    UserDTO userLogin(LoginDTO loginData);

    UserDTO getUserById(Long id);

    UsersPageDTO getAllUsers(String criteria, Integer page, Integer pageSize);

    UserDTO createUser(UserCreationDTO userData);

    UserDTO updateUser(Long userId, UserUpdateDTO userData);

    UserDTO updatePassword(Long userId, String newPassword);
}
