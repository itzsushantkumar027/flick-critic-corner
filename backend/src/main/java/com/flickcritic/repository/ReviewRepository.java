package com.flickcritic.repository;

import com.flickcritic.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    // Find reviews by movie ID
    List<Review> findByMovieId(Long movieId);
    
    // Find reviews by user ID
    List<Review> findByUserId(Long userId);
    
    // Find review by movie ID and user ID
    List<Review> findByMovieIdAndUserId(Long movieId, Long userId);
} 