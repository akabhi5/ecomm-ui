import { Product } from "./products";

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface CategoryProduct extends Category {
  category_products: Product[];
}
