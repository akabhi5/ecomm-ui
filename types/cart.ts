import { ProductPartial } from "./products";

export interface CartItem {
  id: number;
  quantity: number;
  product: ProductPartial;
  size: string;
}

export interface CartSummary {
  product_info: CartSummaryProductInfo[];
  total_price: number;
  discount: number;
}

export interface CartSummaryProductInfo {
  product_id: number;
  size: string;
  price: number;
}
