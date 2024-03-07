import { Product } from "@/types/products";
import Link from "next/link";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className="hover:shadow-md max-w-[220px] border">
      <Link href={`/product/${product.slug}`}>
        <img
          src={product.product_images[0].url}
          alt={product.name}
          className="w-fit max-h-[250px] min-w-full min-h-[250px] object-cover"
        />
        <div className="p-2 text-left">
          <div>{product?.brand?.name}</div>
          <div className="text-xs">{product.name}</div>
          <div>
            Price:{" "}
            <span className="text-slate-600 text-sm">₹ {product.price}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
