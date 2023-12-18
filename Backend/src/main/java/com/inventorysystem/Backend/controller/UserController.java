package com.inventorysystem.Backend.controller;

import com.inventorysystem.Backend.dto.UserCreationDTO;
import com.inventorysystem.Backend.dto.UserDTO;
import com.inventorysystem.Backend.dto.UsersPageDTO;
import com.inventorysystem.Backend.model.User;
import com.inventorysystem.Backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping
    ResponseEntity<UserDTO> createUser(@RequestBody UserCreationDTO user) {
        UserDTO createdUser = userService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }

    @PostMapping("/login")
    ResponseEntity<UserDTO> userLogin(
            @RequestParam("email") String email,
            @RequestParam("password") String password
    ) {
        UserDTO user = userService.userLogin(email, password);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(user);
    }

    @GetMapping
    ResponseEntity<UsersPageDTO> getAllUsers(
            @RequestParam("page") Integer page,
            @RequestParam("pageSize") Integer pageSize
    ) {
        return ResponseEntity.ok(userService.getAllUsers(page, pageSize));
    }

    @GetMapping("/{id}")
    ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        UserDTO user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }
}
