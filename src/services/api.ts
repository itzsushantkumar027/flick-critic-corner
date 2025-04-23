import { Movie, Review, User } from '@/types';

const API_BASE_URL = 'http://localhost:8090/api';

// Movie API Calls
export const movieApi = {
  getAll: async (): Promise<Movie[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/movies`);
      if (!response.ok) throw new Error('Failed to fetch movies');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  },

  getById: async (id: string): Promise<Movie | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/movies/${id}`);
      if (!response.ok) throw new Error('Failed to fetch movie');
      return await response.json();
    } catch (error) {
      console.error(`Error fetching movie with id ${id}:`, error);
      return null;
    }
  },

  search: async (query: string): Promise<Movie[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/movies?search=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Failed to search movies');
      return await response.json();
    } catch (error) {
      console.error('Error searching movies:', error);
      return [];
    }
  },

  create: async (movie: Omit<Movie, 'id'>): Promise<Movie | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/movies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
      });
      if (!response.ok) throw new Error('Failed to create movie');
      return await response.json();
    } catch (error) {
      console.error('Error creating movie:', error);
      return null;
    }
  },

  update: async (id: string, movie: Movie): Promise<Movie | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/movies/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
      });
      if (!response.ok) throw new Error('Failed to update movie');
      return await response.json();
    } catch (error) {
      console.error('Error updating movie:', error);
      return null;
    }
  },

  delete: async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/movies/${id}`, {
        method: 'DELETE',
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting movie:', error);
      return false;
    }
  },
};

// Review API Calls
export const reviewApi = {
  getAll: async (): Promise<Review[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      return await response.json();
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }
  },

  getByMovieId: async (movieId: string): Promise<Review[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews/movie/${movieId}`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      return await response.json();
    } catch (error) {
      console.error(`Error fetching reviews for movie ${movieId}:`, error);
      return [];
    }
  },

  create: async (review: Omit<Review, 'id'>): Promise<Review | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      });
      if (!response.ok) throw new Error('Failed to create review');
      return await response.json();
    } catch (error) {
      console.error('Error creating review:', error);
      return null;
    }
  },

  update: async (id: string, review: Review): Promise<Review | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      });
      if (!response.ok) throw new Error('Failed to update review');
      return await response.json();
    } catch (error) {
      console.error('Error updating review:', error);
      return null;
    }
  },

  delete: async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
        method: 'DELETE',
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting review:', error);
      return false;
    }
  },
};

// User API Calls
export const userApi = {
  login: async (email: string, password: string): Promise<User | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error('Login failed');
      return await response.json();
    } catch (error) {
      console.error('Error during login:', error);
      return null;
    }
  },

  register: async (user: Omit<User, 'id'>): Promise<User | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) throw new Error('Registration failed');
      return await response.json();
    } catch (error) {
      console.error('Error during registration:', error);
      return null;
    }
  },

  getById: async (id: string): Promise<User | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`);
      if (!response.ok) throw new Error('Failed to fetch user');
      return await response.json();
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      return null;
    }
  },
}; 