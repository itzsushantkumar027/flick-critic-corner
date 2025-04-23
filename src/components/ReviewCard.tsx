import { Review } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  // Format date
  const formattedDate = formatDistanceToNow(new Date(review.date), { addSuffix: true });
  
  return (
    <Card className="bg-gray-800 border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-yellow-500 to-amber-700 w-10 h-10 rounded-full flex items-center justify-center text-black font-bold">
              {review.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-white">{review.username}</p>
              <span className="text-sm text-gray-400">{formattedDate}</span>
            </div>
          </div>
          <div className="flex gap-1 bg-gray-900 px-3 py-1 rounded-full">
            {[...Array(5)].map((_, i) => (
              <StarIcon 
                key={i} 
                className={`h-4 w-4 ${
                  i < review.rating 
                    ? "fill-yellow-400 stroke-yellow-400" 
                    : "stroke-gray-500"
                }`} 
              />
            ))}
          </div>
        </div>
        
        <div className="pt-3 border-t border-gray-700">
          <p className="text-gray-300 whitespace-pre-line">{review.comment}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
