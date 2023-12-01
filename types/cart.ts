import { ProductPartial } from "./products";

export interface CartItem {
  id: number;
  quantity: number;
  product: ProductPartial;
}
