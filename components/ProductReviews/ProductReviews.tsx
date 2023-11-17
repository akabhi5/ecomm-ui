"use client";

import { Review } from "@/types/review";
import ReviewCard from "../ReviewCard/ReviewCard";
import Spinner from "../Spinner/Spinner";

interface Props {
  reviews: Review[];
  isLoading: boolean;
  userId: number;
  deleteComment: () => void;
}

const ProductReviews = ({
  reviews,
  isLoading,
  userId,
  deleteComment,
}: Props) => {
  return (
    <section className="flex flex-col space-y-5">
      {isLoading && <Spinner />}
      {!isLoading &&
        reviews.map((review) => (
          <div key={review.id}>
            <ReviewCard
              review={review}
              userId={userId}
              deleteComment={deleteComment}
            />
          </div>
        ))}
    </section>
  );
};

export default ProductReviews;
