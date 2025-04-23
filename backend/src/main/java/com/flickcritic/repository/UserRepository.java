package com.flickcritic.repository;

import com.flickcritic.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Find user by email
    Optional<User> findByEmail(String email);
    
    // Check if a user exists with the given email
    boolean existsByEmail(String email);
} 