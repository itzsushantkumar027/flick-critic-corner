import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import MovieCard from "@/components/MovieCard";
import { User, Movie } from "@/types";
import { movieApi } from "@/services/api";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const HomePage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

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
    
    // Fetch movies
    fetchMovies();
  }, []);

  // Fetch movies from API
  const fetchMovies = async (query?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = query ? await movieApi.search(query) : await movieApi.getAll();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Failed to load movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMovies(searchQuery);
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <Header 
        isLoggedIn={!!currentUser} 
        userRole={currentUser?.role}
        onLogout={handleLogout}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-600">
            Flick Critic Corner
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover the latest movies and share your thoughts with other film enthusiasts.
          </p>
        </div>
        
        {/* Search form */}
        <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto mb-10">
          <Input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
          />
          <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black">
            Search
          </Button>
        </form>
        
        {error && (
          <div className="text-red-400 text-center mb-4">
            {error}
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <Loader2 className="h-12 w-12 animate-spin text-yellow-500" />
          </div>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No movies found</p>
          </div>
        )}
      </main>
      
      <footer className="bg-black text-gray-400 py-6 text-center border-t border-gray-800">
        <div className="container mx-auto">
          <p>© 2023 Flick Critic Corner. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
