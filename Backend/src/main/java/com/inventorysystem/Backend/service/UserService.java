package com.inventorysystem.Backend.service;

import com.inventorysystem.Backend.dto.UsersPageDTO;
import com.inventorysystem.Backend.model.User;

import java.util.List;

public interface UserService {

    User createUser(User user);

    /*User userLogin(String userEmail, String userPassword);*/

    User getUserById(Long id);

    UsersPageDTO getAllUsers(Integer page, Integer pageSize);
}
