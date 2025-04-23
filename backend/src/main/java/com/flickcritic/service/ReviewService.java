package com.flickcritic.service;

import com.flickcritic.model.Review;

import java.util.List;
import java.util.Optional;

public interface ReviewService {
    List<Review> getAllReviews();
    Optional<Review> getReviewById(Long id);
    Review saveReview(Review review);
    void deleteReview(Long id);
    List<Review> getReviewsByMovieId(Long movieId);
    List<Review> getReviewsByUserId(Long userId);
} 