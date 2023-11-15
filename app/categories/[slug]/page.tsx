import ProductCard from "@/components/ProductCard/ProductCard";
import { CategoryProduct } from "@/types/category";

async function getCategoryProducts(categorySlug: string) {
  const res = await fetch(
    `${process.env.API_URL}/products/category/${categorySlug}/`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const CategoryProduct = async ({ params }: { params: { slug: string } }) => {
  const product: CategoryProduct = await getCategoryProducts(params.slug);

  return (
    <section className="p-5">
      <h2 className="text-xl my-4">Products</h2>
      <div className="flex space-x-4 flex-wrap">
        {product.category_products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
};

export default CategoryProduct;
