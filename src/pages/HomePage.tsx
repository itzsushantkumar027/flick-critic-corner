
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import MovieCard from "@/components/MovieCard";
import { movies } from "@/data/mockData";
import { User } from "@/types";

const HomePage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing user data");
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <Header 
        isLoggedIn={!!currentUser} 
        userRole={currentUser?.role}
        onLogout={handleLogout}
      />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Welcome to Movie Hub</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </main>
      
      <footer className="bg-black text-white py-4 text-center text-sm">
        © 2023 Movie Hub. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
