package com.inventorysystem.Backend.service.imp;

import com.inventorysystem.Backend.model.User;
import com.inventorysystem.Backend.repository.UserRepository;
import com.inventorysystem.Backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImp implements UserService {

    private final UserRepository userRepository;

    @Override
    public User userLogin(String userEmail, String userPassword) {
        return userRepository.getLoginUser(userEmail, userPassword);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.getAllUsers();
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
