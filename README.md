# Flick Critic Corner

A full-stack movie review application with a Spring Boot backend and React frontend.

## Overview

Flick Critic Corner allows users to browse movies, read reviews, and write their own reviews after creating an account. The application features a modern, responsive UI built with React, TypeScript, and Tailwind CSS, with a powerful Spring Boot Java backend for better performance.

## Features

- Browse and search for movies
- View detailed movie information and reviews
- User account creation and authentication
- Write and submit movie reviews
- Responsive design that works on desktop and mobile
- Modern UI with animations and transitions

## Tech Stack

### Frontend
- React with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- Shadcn UI components
- React Router for navigation
- React Query for API data fetching

### Backend
- Java Spring Boot
- Spring Data JPA for database access
- H2 in-memory database (can be replaced with MySQL/PostgreSQL)
- Spring Web for RESTful API
- Spring Validation for request validation

## Getting Started

### Prerequisites
- Node.js (v14+)
- Java JDK 17+
- Maven

### Running the Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Build the project with Maven:
   ```
   mvn clean install
   ```

3. Run the Spring Boot application:
   ```
   mvn spring-boot:run
   ```

4. The backend will start on http://localhost:8080/api

### Running the Frontend

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. The frontend will start on http://localhost:5173

## API Endpoints

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/{id}` - Get movie by ID
- `GET /api/movies?search={query}` - Search movies
- `POST /api/movies` - Create a new movie (admin only)
- `PUT /api/movies/{id}` - Update a movie (admin only)
- `DELETE /api/movies/{id}` - Delete a movie (admin only)

### Reviews
- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/{id}` - Get review by ID
- `GET /api/reviews/movie/{movieId}` - Get reviews for a movie
- `POST /api/reviews` - Create a new review
- `PUT /api/reviews/{id}` - Update a review
- `DELETE /api/reviews/{id}` - Delete a review

### Users
- `POST /api/users/login` - User login
- `POST /api/users` - User registration
- `GET /api/users/{id}` - Get user by ID

## License

MIT License
