import { Movie } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { StarIcon } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col bg-gray-800 border-gray-700 group">
      <div className="relative aspect-[2/3] overflow-hidden bg-gray-900">
        <img 
          src={movie.imageUrl} 
          alt={movie.title} 
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full">
            <p className="text-white text-sm line-clamp-3">
              {movie.description}
            </p>
          </div>
        </div>
        <div className="absolute top-2 right-2 bg-yellow-500 text-black rounded-full px-2 py-1 text-xs font-bold flex items-center gap-1">
          <StarIcon className="h-3 w-3 fill-current" />
          {movie.averageRating.toFixed(1)}
        </div>
      </div>
      <CardContent className="p-4 flex-grow bg-gradient-to-b from-gray-800 to-gray-900">
        <h3 className="font-semibold text-lg mb-3 text-white">{movie.title}</h3>
        <Link to={`/movie/${movie.id}`} className="w-full">
          <Button 
            variant="default" 
            className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black transition-all duration-300"
          >
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
