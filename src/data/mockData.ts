
import { Movie, Review, User } from "@/types";

// Mock Movies Data
export const movies: Movie[] = [
  {
    id: "1",
    title: "Movie Title 1",
    imageUrl: "/lovable-uploads/24603cc2-9cc7-40e5-8238-9edc736d6d10.png",
    averageRating: 4.5,
    description: "A thrilling adventure filled with suspense and action. Follow the journey of our hero as they navigate through challenging obstacles and face their greatest fears.",
  },
  {
    id: "2",
    title: "Movie Title 2",
    imageUrl: "/lovable-uploads/24603cc2-9cc7-40e5-8238-9edc736d6d10.png",
    averageRating: 4.0,
    description: "An action-packed film with stunning visual effects. Experience the adrenaline rush as the protagonist battles against all odds in this epic story of courage and determination.",
  },
  {
    id: "3",
    title: "Movie Title 3",
    imageUrl: "/lovable-uploads/24603cc2-9cc7-40e5-8238-9edc736d6d10.png",
    averageRating: 3.5,
    description: "A heartwarming romance that explores the complexities of love and relationships. Witness the beautiful journey of two souls finding their way to each other despite all challenges.",
  },
  {
    id: "4",
    title: "Movie Title 4",
    imageUrl: "/lovable-uploads/24603cc2-9cc7-40e5-8238-9edc736d6d10.png",
    averageRating: 4.75,
    description: "A mind-bending sci-fi masterpiece that challenges your perception of reality. Dive into a world where nothing is as it seems and discover the truth that lies beyond the veil.",
  }
];

// Mock Reviews Data
export const reviews: Review[] = [
  {
    id: "1",
    movieId: "1",
    userId: "1",
    username: "MovieFan123",
    rating: 5,
    comment: "Absolutely incredible! The plot twists kept me on the edge of my seat.",
    date: "2023-04-15"
  },
  {
    id: "2",
    movieId: "1",
    userId: "2",
    username: "CinemaLover",
    rating: 4,
    comment: "Great movie, though the ending could have been better.",
    date: "2023-04-10"
  },
  {
    id: "3",
    movieId: "2",
    userId: "1",
    username: "MovieFan123",
    rating: 4,
    comment: "Spectacular action sequences! The cinematography was breathtaking.",
    date: "2023-04-12"
  },
  {
    id: "4",
    movieId: "3",
    userId: "3",
    username: "FilmCritic42",
    rating: 3,
    comment: "Decent story but predictable. The chemistry between the leads was convincing though.",
    date: "2023-04-08"
  },
  {
    id: "5",
    movieId: "4",
    userId: "2",
    username: "CinemaLover",
    rating: 5,
    comment: "Mind blown! This movie will have you questioning everything you know.",
    date: "2023-04-05"
  }
];

// Mock Users
export const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "user"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user"
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@example.com",
    role: "contentManager"
  }
];
