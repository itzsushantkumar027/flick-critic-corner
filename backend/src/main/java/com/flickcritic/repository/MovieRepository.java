package com.flickcritic.repository;

import com.flickcritic.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    // Find movies by title containing the search term (case insensitive)
    List<Movie> findByTitleContainingIgnoreCase(String title);
} 