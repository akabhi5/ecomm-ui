import SubCategoryCard from "@/components/SubCategoryCard/SubCategoryCard";
import { Category } from "@/types/category";

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
    <div className="max-w-7xl mx-auto">
      {categories.map((category) => (
        <div key={category.id} className="my-10">
          <div className="text-2xl my-5">{category.name}</div>
          <div className="flex flex-wrap gap-4">
            {category.subcategories.map((subcategory) => (
              <SubCategoryCard
                key={subcategory.id}
                name={subcategory.name}
                image={subcategory.image}
                slug={subcategory.slug}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
