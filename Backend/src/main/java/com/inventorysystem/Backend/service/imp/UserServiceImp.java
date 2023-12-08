package com.inventorysystem.Backend.service.imp;

import com.inventorysystem.Backend.dto.UserDTO;
import com.inventorysystem.Backend.dto.UsersPageDTO;
import com.inventorysystem.Backend.mapper.UserMapper;
import com.inventorysystem.Backend.model.User;
import com.inventorysystem.Backend.repository.UserRepository;
import com.inventorysystem.Backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserMapper userMapper;

    /*@Override
    public User userLogin(String userEmail, String userPassword) {
        return userRepository.getLoginUser(userEmail, userPassword);
    }*/

    /*@Override
    public List<User> getAllUsers() {
        return userRepository.getAllUsers();
    }*/

    @Override
    public UsersPageDTO getAllUsers(Integer page, Integer pageSize) {
        UsersPageDTO pagedUsersResponse = new UsersPageDTO();

        Long totalRecords = userRepository.countUsers();
        Integer totalPages = (int) Math.ceil(totalRecords / pageSize);

        Pageable pageable = PageRequest.of(page, pageSize);
        Page<User> userPage = userRepository.findAll(pageable);

        List<UserDTO> users = userPage.getContent().stream()
                .map(user -> userMapper.userToDTO(user))
                .collect(Collectors.toList());

        pagedUsersResponse.setPage(userPage.getNumber());
        pagedUsersResponse.setPageSize(userPage.getSize());
        pagedUsersResponse.setTotalRecords(userPage.getTotalElements());
        pagedUsersResponse.setTotalPages(userPage.getTotalPages());
        pagedUsersResponse.setUsers(users);

        return pagedUsersResponse;
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.getUserById(id);
    }

    @Override
    public User createUser(User user) {
        // Password encryption
        Long newUserId = userRepository.createUser(
                user.getName(),
                user.getUsername(),
                user.getPasswordHash(),
                user.getPhoneNumber(),
                user.getEmail(),
                user.getAdmin()
        );
        return userRepository.getUserById(newUserId);
    }
}
