import { Product } from "@/types/products";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import ProductReviews from "@/components/ProductReviews/ProductReviews";
import ReviewComment from "@/components/ReviewComment/ReviewComment";
import { useRef } from "react";

async function getData(slug: string) {
  const res = await fetch(`${process.env.API_URL}/products/${slug}/`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Product = async ({ params }: { params: { slug: string } }) => {
  const product: Product = await getData(params.slug);

  return (
    <section className="px-14 mx-auto my-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="col-span-8 flex flex-wrap justify-evenly">
          {product.product_images.map((image) => (
            <img
              key={image.id}
              src={image.url}
              alt="..."
              width={300}
              className="p-3"
            />
          ))}
        </div>
        <div className="col-span-4 space-y-5">
          <div className="text-4xl">{product.name}</div>
          <div className="text-2xl text-slate-700">₹ {product.price}</div>
          <div className="flex space-x-5">
            <Button>Add to bag</Button>
            <Button variant="outline">
              <Heart className="mr-2 h-4 w-4" />
              Wishlist
            </Button>
          </div>
          <div>{product.description}</div>
        </div>
      </div>
      <hr className="my-16" />
      <h3 className="text-2xl mb-3">Reviews</h3>
      <div className="grid grid-flow-col grid-cols-10 gap-6 items-start">
        <div className="col-span-6">
          <ProductReviews productSlug={params.slug} />
        </div>
        <div className="col-span-4">
          <ReviewComment productSlug={params.slug} />
        </div>
      </div>
    </section>
  );
};

export default Product;
