export interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  description: string;
  created_on: string;
  updated_on: string;
  product_images: ProductImage[];
}

export interface ProductImage {
  id: number;
  url: string;
}

export interface ProductPartial {
  id: number;
  name: string;
  slug: string;
  product_images: ProductImage[];
}
