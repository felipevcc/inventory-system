package com.inventorysystem.Backend.controller;

import com.inventorysystem.Backend.model.User;
import com.inventorysystem.Backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }

    @PostMapping("/login")
    ResponseEntity<User> userLogin(
            @RequestParam("email") String email,
            @RequestParam("password") String password
    ) {
        User user = userService.userLogin(email, password);
        return ResponseEntity.ok(user);
    }

    @GetMapping
    ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    ResponseEntity<User> getUserById(@PathVariable Long id) {
        User customer = userService.getUserById(id);
        return ResponseEntity.ok(customer);
    }
}
