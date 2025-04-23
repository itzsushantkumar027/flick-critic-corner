import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import ReviewCard from "@/components/ReviewCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Movie, Review, User } from "@/types";
import { StarIcon, Loader2, AlertCircle } from "lucide-react";
import { movieApi, reviewApi } from "@/services/api";

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
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
    
    // Fetch movie and review data
    if (id) {
      fetchMovieData(id);
    }
  }, [id]);

  // Fetch movie and review data
  const fetchMovieData = async (movieId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const movieData = await movieApi.getById(movieId);
      if (!movieData) {
        navigate('/not-found');
        return;
      }
      
      setMovie(movieData);
      
      const reviewsData = await reviewApi.getByMovieId(movieId);
      setReviews(reviewsData);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load movie data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  // Handle submitting a new review
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      alert("Please login to submit a review");
      return;
    }
    
    if (!movie) {
      return;
    }
    
    if (!newReview.comment) {
      alert("Please enter a comment");
      return;
    }
    
    setSubmitting(true);
    
    try {
      const reviewData = {
        movieId: movie.id,
        userId: currentUser.id,
        username: currentUser.name,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0]
      };
      
      const createdReview = await reviewApi.create(reviewData);
      
      if (createdReview) {
        // Refresh reviews
        const updatedReviews = await reviewApi.getByMovieId(movie.id);
        setReviews(updatedReviews);
        
        // Refresh movie to get updated rating
        const updatedMovie = await movieApi.getById(movie.id);
        if (updatedMovie) {
          setMovie(updatedMovie);
        }
        
        // Reset form
        setNewReview({ rating: 5, comment: "" });
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white flex justify-center items-center">
        <Loader2 className="h-12 w-12 animate-spin text-yellow-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white flex flex-col justify-center items-center p-4">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold mb-2">Error Loading Movie</h2>
        <p className="text-gray-400 mb-4 text-center">{error}</p>
        <Link to="/">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <Header 
        isLoggedIn={!!currentUser} 
        userRole={currentUser?.role}
        onLogout={handleLogout}
      />
      
      <main className="container mx-auto px-4 py-8">
        <Link to="/" className="text-yellow-500 hover:text-yellow-400 mb-6 inline-flex items-center gap-1">
          <span>←</span> Back to Movies
        </Link>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Movie poster */}
          <div className="aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden shadow-xl">
            <img 
              src={movie.imageUrl} 
              alt={movie.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Movie details */}
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-3 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-600">
              {movie.title}
            </h1>
            
            <div className="flex items-center gap-2 mb-6 bg-gray-800 inline-block py-2 px-4 rounded-full">
              <StarIcon className="h-5 w-5 fill-yellow-400 stroke-yellow-400" />
              <span className="font-medium text-lg">{movie.averageRating.toFixed(1)}</span>
              <span className="text-gray-400">({reviews.length} reviews)</span>
            </div>
            
            <div className="mb-8 p-6 bg-gray-800 rounded-lg border border-gray-700">
              <h2 className="text-xl font-semibold mb-3 text-white">Synopsis</h2>
              <p className="text-gray-300 leading-relaxed">{movie.description}</p>
            </div>
            
            {/* New review form for logged in users */}
            {currentUser ? (
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-white">Write a Review</h2>
                <form onSubmit={handleReviewSubmit}>
                  <StarRating />
                  
                  <Textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Share your thoughts about this movie..."
                    className="mb-4 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                  />
                  
                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Review"
                    )}
                  </Button>
                </form>
              </div>
            ) : (
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center">
                <p className="mb-3 text-gray-300">Please login to write a review</p>
                <Link to="/login">
                  <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black">
                    Login to Review
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Reviews section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-700">
            Reviews <span className="text-gray-400">({reviews.length})</span>
          </h2>
          
          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
              <p className="text-gray-400 mb-3">No reviews yet.</p>
              {currentUser ? (
                <p className="text-yellow-500">Be the first to share your thoughts!</p>
              ) : (
                <Link to="/login">
                  <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black">
                    Login to Write a Review
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-black text-gray-400 py-6 text-center border-t border-gray-800">
        <div className="container mx-auto">
          <p>© 2023 Flick Critic Corner. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MovieDetailPage;
