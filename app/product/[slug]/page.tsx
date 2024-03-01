import { Product, SizeQuantity } from "@/types/products";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Reviews from "@/components/Reviews/Reviews";
import AddToCart from "@/components/AddToCart/AddToCart";
import AddToWishlist from "@/components/AddToWishlist/AddToWishlist";
import ProductSizeBtns from "@/components/ProductSizeBtns/ProductSizeBtns";
import ProductPageActions from "@/components/ProductPageActions/ProductPageActions";

async function getData(slug: string) {
  const res = await fetch(`${process.env.API_URL}/products/${slug}/`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Product = async ({ params }: { params: { slug: string } }) => {
  const product: Product = await getData(params.slug);

  const productSizes = Object.entries(product.size_quantity).map(
    ([key, value]) => {
      return { size: key, quantity: value };
    }
  );

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
          <div>
            <ProductPageActions
              productSizes={productSizes}
              prductSlug={params.slug}
            />
          </div>
          <div>{product.description}</div>
        </div>
      </div>
      <hr className="my-16" />
      <Reviews productSlug={params.slug} />
    </section>
  );
};

export default Product;
