import { Review } from "@/types/review";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { generateInitials } from "@/utils";

interface Props {
  review: Review;
}

const ReviewCard = ({ review }: Props) => {
  return (
    <div className="border p-3 rounded-md">
      <div className="flex items-center space-x-5 mb-4">
        <Avatar>
          <AvatarFallback>{generateInitials(review.customer)}</AvatarFallback>
        </Avatar>

        <div className="text-xl">{review.customer}</div>
      </div>
      <div>{review.comment}</div>
    </div>
  );
};

export default ReviewCard;
