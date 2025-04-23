package com.flickcritic.config;

import com.flickcritic.model.Movie;
import com.flickcritic.model.Review;
import com.flickcritic.model.User;
import com.flickcritic.repository.MovieRepository;
import com.flickcritic.repository.ReviewRepository;
import com.flickcritic.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final MovieRepository movieRepository;
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;

    @Autowired
    public DataLoader(MovieRepository movieRepository, UserRepository userRepository, ReviewRepository reviewRepository) {
        this.movieRepository = movieRepository;
        this.userRepository = userRepository;
        this.reviewRepository = reviewRepository;
    }

    @Override
    public void run(String... args) {
        loadUsers();
        loadMovies();
        loadReviews();
    }

    private void loadUsers() {
        List<User> users = Arrays.asList(
            new User(null, "John Doe", "john@example.com", "password", "user", new ArrayList<>()),
            new User(null, "Jane Smith", "jane@example.com", "password", "critic", new ArrayList<>()),
            new User(null, "Admin User", "admin@example.com", "password", "admin", new ArrayList<>())
        );
        userRepository.saveAll(users);
        System.out.println("Sample users loaded");
    }

    private void loadMovies() {
        List<Movie> movies = Arrays.asList(
            new Movie(null, "Avatar", "file:///C:/demo_movie/Avatar.jpg", 
                    "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.", 
                    4.5, new ArrayList<>()),
            new Movie(null, "Black Panther", "file:///C:/demo_movie/Black Panther.jpg", 
                    "T'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and must confront a challenger from his country's past.", 
                    4.6, new ArrayList<>()),
            new Movie(null, "Spiderman", "file:///C:/demo_movie/Spiderman.jpg", 
                    "After being bitten by a genetically-modified spider, a shy teenager gains spider-like abilities that he uses to fight injustice as a masked superhero and face a vengeful enemy.", 
                    4.4, new ArrayList<>()),
            new Movie(null, "Archer", "file:///C:/demo_movie/Archer.jpg", 
                    "Covert black ops and espionage take a back seat to zany personalities and relationships between secret agents and drones.", 
                    4.3, new ArrayList<>())
        );
        movieRepository.saveAll(movies);
        System.out.println("Sample movies loaded");
    }

    private void loadReviews() {
        // Get saved entities
        List<User> users = userRepository.findAll();
        List<Movie> movies = movieRepository.findAll();
        
        if (users.isEmpty() || movies.isEmpty()) {
            return;
        }
        
        // Create reviews
        List<Review> reviews = Arrays.asList(
            new Review(null, movies.get(0), users.get(0), users.get(0).getName(), 5, 
                    "A groundbreaking visual spectacle with an immersive world and compelling story.", 
                    LocalDate.now().minusDays(10)),
            new Review(null, movies.get(0), users.get(1), users.get(1).getName(), 4, 
                    "Stunning visuals and world-building, though the story feels familiar.", 
                    LocalDate.now().minusDays(5)),
            new Review(null, movies.get(1), users.get(0), users.get(0).getName(), 5, 
                    "A cultural phenomenon that delivers both as a superhero film and a meaningful story.", 
                    LocalDate.now().minusDays(15)),
            new Review(null, movies.get(2), users.get(1), users.get(1).getName(), 5, 
                    "The definitive Spider-Man movie that perfectly captures the essence of the character.", 
                    LocalDate.now().minusDays(20)),
            new Review(null, movies.get(3), users.get(0), users.get(0).getName(), 4, 
                    "Hilarious and irreverent with sharp writing and great character dynamics.", 
                    LocalDate.now().minusDays(25))
        );
        
        reviewRepository.saveAll(reviews);
        
        // Update movie ratings
        for (Movie movie : movies) {
            movie.calculateAverageRating();
            movieRepository.save(movie);
        }
        
        System.out.println("Sample reviews loaded");
    }
} 