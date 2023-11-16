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
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User userLogin(String userEmail, String userPassword) {
        return userRepository.getLoginUser(userEmail, userPassword);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

}
