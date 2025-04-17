
import { Movie } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { StarIcon } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
      <div className="relative aspect-[2/3] overflow-hidden bg-gray-100">
        <img 
          src={movie.imageUrl} 
          alt={movie.title} 
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-4 flex-grow">
        <h3 className="font-semibold text-lg mb-1">{movie.title}</h3>
        <div className="flex items-center gap-1 mb-2">
          <StarIcon className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
          <span className="text-sm">Average Rating: {movie.averageRating.toFixed(1)}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link to={`/movie/${movie.id}`} className="w-full">
          <Button variant="outline" className="w-full hover:bg-movie-primary hover:text-white">
            Read Reviews
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
