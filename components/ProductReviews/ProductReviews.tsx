"use client";

import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import { Review } from "@/types/review";
import ReviewCard from "../ReviewCard/ReviewCard";

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

  useEffect(() => {
    const getReviews = async () => {
      const res = await getProductReviews(productSlug);
      setReviews(res);
      setIsLoading(false);
    };
    getReviews();
  }, [productSlug, reloadComments]);

  const addNewComment = () => {
    const comment = {
      id: 1000,
      customer: "string",
      product: productSlug,
      comment: " some comment",
    } as Review;
    setReviews((prev) => [comment, ...prev]);
  };

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
