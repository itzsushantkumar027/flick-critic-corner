
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import ReviewCard from "@/components/ReviewCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { movies, reviews as mockReviews } from "@/data/mockData";
import { Movie, Review, User } from "@/types";
import { StarIcon } from "lucide-react";

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  
  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing user data");
      }
    }
  }, []);

  // Fetch movie and review data based on ID
  useEffect(() => {
    if (id) {
      const foundMovie = movies.find(m => m.id === id);
      
      if (foundMovie) {
        setMovie(foundMovie);
        setReviews(mockReviews.filter(r => r.movieId === id));
      } else {
        navigate('/not-found');
      }
    }
  }, [id, navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  // Handle submitting a new review
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      alert("Please login to submit a review");
      return;
    }
    
    if (!newReview.comment) {
      alert("Please enter a comment");
      return;
    }
    
    // In a real app, this would send data to your API
    const newReviewObject: Review = {
      id: `${Date.now()}`,
      movieId: movie?.id || "",
      userId: currentUser.id,
      username: currentUser.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };
    
    // Update local state
    setReviews([newReviewObject, ...reviews]);
    setNewReview({ rating: 5, comment: "" });
    alert("Review submitted successfully!");
  };

  // Create star rating UI
  const StarRating = () => {
    return (
      <div className="flex space-x-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setNewReview({ ...newReview, rating: star })}
            className="focus:outline-none"
          >
            <StarIcon 
              className={`h-6 w-6 ${
                star <= newReview.rating 
                  ? "fill-yellow-400 stroke-yellow-400" 
                  : "fill-none stroke-gray-300"
              }`} 
            />
          </button>
        ))}
      </div>
    );
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <Header 
        isLoggedIn={!!currentUser} 
        userRole={currentUser?.role}
        onLogout={handleLogout}
      />
      
      <main className="container mx-auto px-4 py-8">
        <Link to="/" className="text-movie-primary hover:underline mb-4 inline-block">
          &larr; Back to Movies
        </Link>
        
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Movie poster */}
          <div className="aspect-[2/3] bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={movie.imageUrl} 
              alt={movie.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Movie details */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
            
            <div className="flex items-center gap-1 mb-4">
              <StarIcon className="h-5 w-5 fill-yellow-400 stroke-yellow-400" />
              <span className="font-medium">Average Rating: {movie.averageRating.toFixed(1)}</span>
            </div>
            
            <p className="mb-6 text-gray-700 dark:text-gray-300">{movie.description}</p>
            
            {/* New review form for logged in users */}
            {currentUser ? (
              <div className="bg-white dark:bg-card p-4 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
                <form onSubmit={handleReviewSubmit}>
                  <StarRating />
                  
                  <Textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Share your thoughts about this movie..."
                    className="mb-4"
                  />
                  
                  <Button type="submit" className="bg-movie-primary hover:bg-movie-secondary">
                    Submit Review
                  </Button>
                </form>
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-card p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
                <p className="mb-3">Please login to write a review</p>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Reviews section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Reviews ({reviews.length})</h2>
          
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">No reviews yet. Be the first to review!</p>
          )}
        </div>
      </main>
      
      <footer className="bg-black text-white py-4 text-center text-sm">
        © 2023 Movie Hub. All rights reserved.
      </footer>
    </div>
  );
};

export default MovieDetailPage;
