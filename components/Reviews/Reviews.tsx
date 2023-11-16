import ProductReviews from "../ProductReviews/ProductReviews";
import ReviewComment from "../ReviewComment/ReviewComment";

interface Props {
  productSlug: string;
}

const Reviews = ({ productSlug }: Props) => {
  return (
    <>
      <h3 className="text-2xl mb-3">Reviews</h3>
      <div className="grid grid-flow-col grid-cols-10 gap-6 items-start">
        <div className="col-span-6">
          <ProductReviews productSlug={productSlug} />
        </div>
        <div className="col-span-4">
          <ReviewComment productSlug={productSlug} />
        </div>
      </div>
    </>
  );
};

export default Reviews;
