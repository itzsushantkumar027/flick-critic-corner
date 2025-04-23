package com.flickcritic.service;

import com.flickcritic.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAllUsers();
    Optional<User> getUserById(Long id);
    Optional<User> getUserByEmail(String email);
    User saveUser(User user);
    boolean deleteUser(Long id);
    boolean existsByEmail(String email);
} 