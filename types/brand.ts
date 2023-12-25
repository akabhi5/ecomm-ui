import { Product } from "./products";

export interface Brand {
  id: number;
  name: string;
  image: string;
  description: string;
  slug: string;
  seller: number;
}

export interface BrandProduct {
  id: number;
  name: string;
  image: string;
  description: string;
  slug: string;
  seller: number;
  brand_products: Product[];
}
