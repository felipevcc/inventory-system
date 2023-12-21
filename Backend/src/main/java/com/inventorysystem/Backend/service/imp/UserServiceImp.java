package com.inventorysystem.Backend.service.imp;

import com.inventorysystem.Backend.dto.UserCreationDTO;
import com.inventorysystem.Backend.dto.UserDTO;
import com.inventorysystem.Backend.dto.UserUpdateDTO;
import com.inventorysystem.Backend.dto.UsersPageDTO;
import com.inventorysystem.Backend.mapper.UserMapper;
import com.inventorysystem.Backend.model.User;
import com.inventorysystem.Backend.repository.UserRepository;
import com.inventorysystem.Backend.repository.specifications.UserSpecifications;
import com.inventorysystem.Backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserMapper userMapper;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    @Override
    public UserDTO userLogin(String userEmail, String userPassword) {
        User user = userRepository.findByEmail(userEmail);

        if (user == null) {
            return null;
        }
        Boolean successfulLogin = passwordEncoder.matches(userPassword, user.getPasswordHash());
        if (!successfulLogin) {
            return null;
        }

        return userMapper.userToDTO(user);
    }

    /*@Override
    public List<User> getAllUsers() {
        return userRepository.getAllUsers();
    }*/

    @Override
    public UsersPageDTO getAllUsers(String criteria, Integer page, Integer pageSize) {
        UsersPageDTO pagedUsersResponse = new UsersPageDTO();

        Long totalRecords = userRepository.countUsers();
        Integer totalPages = (int) Math.ceil(totalRecords / pageSize);

        Pageable pageable = PageRequest.of(page, pageSize, Sort.by("userId").descending());

        Page<User> userPage;

        if (criteria == null) {
            userPage = userRepository.findAll(pageable);
        } else {
            userPage = userRepository.findAll(UserSpecifications.searchUsers(criteria), pageable);
        }

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
    @Transactional
    public UserDTO getUserById(Long id) {
        User foundUser = userRepository.getUserById(id);
        return userMapper.userToDTO(foundUser);
    }

    @Override
    @Transactional
    public UserDTO createUser(UserCreationDTO userData) {
        // Password encryption
        String passwordHash = passwordEncoder.encode(userData.getPassword());

        Long newUserId = userRepository.createUser(
                userData.getName(),
                userData.getUsername(),
                passwordHash,
                userData.getPhoneNumber(),
                userData.getEmail(),
                userData.getAdmin()
        );
        User newUser = userRepository.getUserById(newUserId);
        return userMapper.userToDTO(newUser);
    }

    @Override
    @Transactional
    public UserDTO updateUser(Long userId, UserUpdateDTO userData) {
        User foundUser = userRepository.getUserById(userId);

        if (!userData.getUsername().equalsIgnoreCase(foundUser.getUsername()) &&
                userRepository.findByUsername(userData.getUsername()) != null) {
            System.out.println("El nombre de usuario no está disponible");
            return null;
        } else if (!userData.getEmail().equalsIgnoreCase(foundUser.getEmail()) &&
                userRepository.findByEmail(userData.getEmail()) != null) {
            System.out.println("El correo no está disponible");
            return null;
        }

        foundUser.setName(userData.getName());
        foundUser.setUsername(userData.getUsername());
        foundUser.setPhoneNumber(userData.getPhoneNumber());
        foundUser.setEmail(userData.getEmail());

        User sessionUser = userRepository.getUserById(userData.getSessionUserId());
        if (sessionUser.getUserId() > 1 && sessionUser.getAdmin() == true) {
            foundUser.setAdmin(userData.getAdmin());
        }

        // Call procedure
        userRepository.updateUser(
                foundUser.getUserId(),
                foundUser.getName(),
                foundUser.getUsername(),
                foundUser.getPasswordHash(),
                foundUser.getPhoneNumber(),
                foundUser.getEmail(),
                foundUser.getAdmin()
        );

        // Call class method for get by user id
        return getUserById(foundUser.getUserId());
    }

    @Override
    @Transactional
    public UserDTO updatePassword(Long userId, String newPassword) {
        User foundUser = userRepository.getUserById(userId);
        foundUser.setPasswordHash(passwordEncoder.encode(newPassword));
        User updatedUser = userRepository.save(foundUser);
        return userMapper.userToDTO(updatedUser);
    }
}
