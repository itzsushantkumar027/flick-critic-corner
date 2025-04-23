package com.flickcritic.service;

import com.flickcritic.model.Movie;
import com.flickcritic.model.Review;
import com.flickcritic.repository.MovieRepository;
import com.flickcritic.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final MovieRepository movieRepository;

    @Autowired
    public ReviewServiceImpl(ReviewRepository reviewRepository, MovieRepository movieRepository) {
        this.reviewRepository = reviewRepository;
        this.movieRepository = movieRepository;
    }

    @Override
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    @Override
    public Optional<Review> getReviewById(Long id) {
        return reviewRepository.findById(id);
    }

    @Override
    @Transactional
    public Review saveReview(Review review) {
        Review savedReview = reviewRepository.save(review);
        
        // Update the movie's average rating
        Movie movie = review.getMovie();
        if (movie != null) {
            Optional<Movie> movieOpt = movieRepository.findById(movie.getId());
            if (movieOpt.isPresent()) {
                Movie updatedMovie = movieOpt.get();
                updatedMovie.calculateAverageRating();
                movieRepository.save(updatedMovie);
            }
        }
        
        return savedReview;
    }

    @Override
    @Transactional
    public void deleteReview(Long id) {
        Optional<Review> reviewOpt = reviewRepository.findById(id);
        if (reviewOpt.isPresent()) {
            Review review = reviewOpt.get();
            Movie movie = review.getMovie();
            
            reviewRepository.deleteById(id);
            
            // Update the movie's average rating after deletion
            if (movie != null) {
                Optional<Movie> movieOpt = movieRepository.findById(movie.getId());
                if (movieOpt.isPresent()) {
                    Movie updatedMovie = movieOpt.get();
                    updatedMovie.calculateAverageRating();
                    movieRepository.save(updatedMovie);
                }
            }
        } else {
            reviewRepository.deleteById(id);
        }
    }

    @Override
    public List<Review> getReviewsByMovieId(Long movieId) {
        return reviewRepository.findByMovieId(movieId);
    }

    @Override
    public List<Review> getReviewsByUserId(Long userId) {
        return reviewRepository.findByUserId(userId);
    }
} 