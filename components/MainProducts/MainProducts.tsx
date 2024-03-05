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
    <section className="max-w-screen-xl mx-auto">
      <h2 className="text-xl my-4">Products</h2>
      <div className="grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {products.map((product) => (
          <div key={product.id} className="col-span-1">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MainProducts;
