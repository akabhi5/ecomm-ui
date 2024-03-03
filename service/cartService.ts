"use server";

import { CartItem } from "@/types/cart";
import { cookies } from "next/headers";

const url = `${process.env.API_URL}/cart/cart-items/`;

export async function getCartItems(): Promise<CartItem[]> {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("token")?.value}`,
    },
  });

  if (res.ok) {
    const result: CartItem[] = await res.json();
    return result;
  }
  return [] as CartItem[];
}

export async function addItemToCart(
  quantity: number,
  productSlug: string,
  selectedSize: string
): Promise<[CartItem, boolean]> {
  const data = {
    quantity: quantity,
    product_slug: productSlug,
    size: selectedSize,
  };
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${cookies().get("token")?.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const result: CartItem = await res.json();
    return [result, true];
  }
  return [{} as CartItem, false];
}

export async function changeQuantityOfCartItem(
  quantity: number,
  productSlug: string,
  size: string
): Promise<boolean> {
  const deleteUrl = `${url}${productSlug}/${size}/`;
  const res = await fetch(deleteUrl, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${cookies().get("token")?.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity: quantity }),
  });
  if (res.ok) {
    return true;
  }
  return false;
}

export async function removeItemFromCart(
  productSlug: string,
  size: string
): Promise<boolean> {
  const deleteUrl = `${url}${productSlug}/${size}/`;
  const res = await fetch(deleteUrl, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${cookies().get("token")?.value}`,
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return true;
  }
  return false;
}

export async function getCartSummary() {
  const cartSummaryUrl = `${process.env.API_URL}/cart/cart-total/`;

  const res = await fetch(cartSummaryUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${cookies().get("token")?.value}`,
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return res.json();
  }
  return [];
}
