import { Product } from "@/types/products";
import ProductCard from "../ProductCard/ProductCard";

async function getData() {
  const res = await fetch(`${process.env.API_URL}/products/`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const MainProducts = async () => {
  const products: Product[] = await getData();

  return (
    <section>
      <h2 className="text-xl my-4">Products</h2>
      <div className="flex space-x-4 flex-wrap">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
};

export default MainProducts;
