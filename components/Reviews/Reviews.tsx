"use client";

import { useState } from "react";
import ProductReviews from "../ProductReviews/ProductReviews";
import ReviewComment from "../ReviewComment/ReviewComment";

interface Props {
  productSlug: string;
}

const Reviews = ({ productSlug }: Props) => {
  const [reloadComments, setReloadComments] = useState(false);

  const newCommentSignal = () => {
    setReloadComments((prev) => !prev);
  };

  return (
    <>
      <h3 className="text-2xl mb-3">Reviews</h3>
      <div className="grid grid-flow-col grid-cols-10 gap-6 items-start">
        <div className="col-span-6">
          <ProductReviews
            productSlug={productSlug}
            reloadComments={reloadComments}
          />
        </div>
        <div className="col-span-4">
          <ReviewComment
            productSlug={productSlug}
            newCommentSignal={newCommentSignal}
          />
        </div>
      </div>
    </>
  );
};

export default Reviews;
