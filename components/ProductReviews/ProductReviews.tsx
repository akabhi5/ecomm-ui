"use client";

import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import { Review } from "@/types/review";
import ReviewCard from "../ReviewCard/ReviewCard";
import { moveObjectToZeroIndex } from "@/utils";
import { useUserStore } from "@/store/useStore";

interface Props {
  productSlug: string;
  reloadComments: boolean;
}

const getProductReviews = async (productSlug: string) => {
  const res = await fetch(`/api/reviews/${productSlug}`);
  return await res.json();
};

const ProductReviews = ({ productSlug, reloadComments }: Props) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const userId = useUserStore((store) => store.user.id);

  useEffect(() => {
    const getReviews = async () => {
      let res: Review[] = await getProductReviews(productSlug);
      if (userId) res = moveObjectToZeroIndex<Review>(res, userId);
      setReviews(res);
      setIsLoading(false);
    };
    getReviews();
  }, [productSlug, reloadComments]);

  return (
    <section className="flex flex-col space-y-5">
      {isLoading && <Spinner />}
      {!isLoading &&
        reviews.map((review) => (
          <div key={review.id}>
            <ReviewCard review={review} />
          </div>
        ))}
    </section>
  );
};

export default ProductReviews;
