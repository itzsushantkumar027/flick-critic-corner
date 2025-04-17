
import { Review } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StarIcon } from "lucide-react";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  // Create array of stars based on rating
  const stars = Array.from({ length: 5 }, (_, index) => (
    <StarIcon 
      key={index} 
      className={`h-4 w-4 ${
        index < review.rating 
          ? "fill-yellow-400 stroke-yellow-400" 
          : "fill-none stroke-gray-300"
      }`} 
    />
  ));

  // Format date
  const formattedDate = new Date(review.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">{review.username}</h3>
            <p className="text-xs text-muted-foreground">{formattedDate}</p>
          </div>
          <div className="flex">{stars}</div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{review.comment}</p>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
