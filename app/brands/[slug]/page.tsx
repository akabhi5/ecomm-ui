import ProductCard from "@/components/ProductCard/ProductCard";
import { BrandProduct } from "@/types/brand";

async function getBrandDetail(brandSlug: string) {
  const res = await fetch(`${process.env.API_URL}/brands/${brandSlug}/`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const CategoryProduct = async ({ params }: { params: { slug: string } }) => {
  const brand: BrandProduct = await getBrandDetail(params.slug);

  return (
    <section className="p-5">
      <section className="border rounded-md">
        <div className="w-48 h-32 flex items-center mx-auto">
          <img src={brand.image} alt={brand.name} />
        </div>
        <div className="px-6 text-center mb-3">{brand.description}</div>
      </section>

      <h2 className="text-xl mt-8 mb-4">Products</h2>
      <div className="flex space-x-4 flex-wrap">
        {brand.brand_products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
};

export default CategoryProduct;
