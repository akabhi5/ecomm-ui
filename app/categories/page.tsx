import { Category } from "@/types/category";
import Link from "next/link";

async function getCategories() {
  const res = await fetch(`${process.env.API_URL}/products/category/`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Categories = async () => {
  const categories: Category[] = await getCategories();

  return (
    <div>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`categories/${category.slug}`}
          className="flex hover:underline"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default Categories;
