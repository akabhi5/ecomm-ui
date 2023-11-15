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
          className="max-w-[200px] max-h-[250px] min-w-[200px] min-h-[250px]"
        />
        <div className="p-2">
          <div>{product.name}</div>
          <div>
            Price: <span className="text-slate-600">₹ {product.price}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
