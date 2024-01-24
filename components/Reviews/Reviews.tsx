"use client";

import { useEffect, useState } from "react";
import ProductReviews from "../ProductReviews/ProductReviews";
import ReviewComment from "../ReviewComment/ReviewComment";
import { Review } from "@/types/review";
import { moveObjectToZeroIndex } from "@/utils";
import { useUserStore } from "@/store/userStore";
import toast from "react-hot-toast";

interface Props {
  productSlug: string;
}

const getProductReviews = async (productSlug: string) => {
  const res = await fetch(`/api/reviews/${productSlug}`);
  return await res.json();
};

const deleteReview = async (productSlug: string) => {
  const res = await fetch(`/api/reviews/${productSlug}`, { method: "DELETE" });
  return res.ok;
};

const postReviews = async (
  productSlug: string,
  comment: string
): Promise<[boolean, Review, number]> => {
  const res = await fetch(`/api/reviews/${productSlug}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment: comment }),
  });
  const result: Review = await res.json();
  return [res.ok, result, res.status];
};

const Reviews = ({ productSlug }: Props) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmittingComment, setIsSubmittingComment] =
    useState<boolean>(false);
  const user = useUserStore((store) => store.user);
  const isAuthenticated = useUserStore((store) => store.isAuthenticated);

  useEffect(() => {
    const getReviews = async () => {
      let res: Review[] = await getProductReviews(productSlug);
      if (user.id) res = moveObjectToZeroIndex<Review>(res, user.id);
      setReviews(res);
      setIsLoading(false);
    };
    getReviews();
  }, [productSlug, user.id]);

  const deleteComment = async () => {
    const isSuccess = await deleteReview(productSlug);
    if (isSuccess) {
      const existingReviews = [...reviews];
      existingReviews.shift();
      setReviews(existingReviews);
      toast.success("Comment deleted", { position: "bottom-right" });
    } else {
      toast.error("Unable to delete. Try again!", { position: "bottom-right" });
    }
  };

  const onSubmitComment = async (comment: string) => {
    setIsSubmittingComment(true);
    const [isSuccess, newComment, status] = await postReviews(
      productSlug,
      comment
    );
    setIsSubmittingComment(false);
    if (isSuccess) {
      const updatedReviews = [newComment, ...reviews];
      setReviews(updatedReviews);
      toast.success("Comment added", { position: "bottom-right" });
    } else {
      if (status == 400)
        toast.error("You have already reviewed the product!", {
          position: "bottom-right",
        });
      else
        toast.error("Comment not added. Try again!", {
          position: "bottom-right",
        });
    }
    return isSuccess;
  };

  return (
    <>
      {reviews?.length > 0 ? (
        <h3 className="text-2xl mb-3">Reviews</h3>
      ) : (
        <h3 className="text-2xl mb-3">No reviews yet</h3>
      )}
      <div className="grid grid-flow-col grid-cols-10 gap-6 items-start">
        <div className="col-span-6">
          <ProductReviews
            reviews={reviews}
            isLoading={isLoading}
            userId={user.id}
            deleteComment={deleteComment}
          />
        </div>
        <div className="col-span-4">
          <ReviewComment
            onSubmitComment={onSubmitComment}
            isSubmittingComment={isSubmittingComment}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </div>
    </>
  );
};

export default Reviews;
