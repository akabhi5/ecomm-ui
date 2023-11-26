import { Product } from "./products";

export interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: number;
  name: string;
  slug: string;
  image: string;
}

export interface CategoryProduct extends Subcategory {
  category_products: Product[];
}
