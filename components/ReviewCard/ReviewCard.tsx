import { Review } from "@/types/review";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { generateInitials } from "@/utils";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  review: Review;
  userId: number;
  deleteComment: () => void;
}

const ReviewCard = ({ review, userId, deleteComment }: Props) => {
  return (
    <div className="border p-3 rounded-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-5">
          <Avatar>
            <AvatarFallback>{generateInitials(review.customer)}</AvatarFallback>
          </Avatar>

          <div className="text-xl">{review.customer}</div>
        </div>
        <div>
          {review.customerId === userId && (
            <Button
              onClick={() => deleteComment()}
              variant="outline"
              size="icon"
            >
              <Trash2 color="red" className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <div>{review.comment}</div>
    </div>
  );
};

export default ReviewCard;
