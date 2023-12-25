import { Brand } from "@/types/brand";
import Link from "next/link";

async function getBrands() {
  const res = await fetch(`${process.env.API_URL}/brands/`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Brands = async () => {
  const brands: Brand[] = await getBrands();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center space-x-5 my-5">
        {brands.map((brand) => (
          <Link
            href={`/brands/${brand.slug}`}
            key={brand.id}
            className="border"
          >
            <div className="w-48 h-32 flex items-center">
              <img src={brand.image} alt={brand.name} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Brands;
