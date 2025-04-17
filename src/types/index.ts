
// Movie types
export interface Movie {
  id: string;
  title: string;
  imageUrl: string;
  averageRating: number;
  description: string;
}

// Review types
export interface Review {
  id: string;
  movieId: string;
  userId: string;
  username: string;
  rating: number;
  comment: string;
  date: string;
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'contentManager';
}
