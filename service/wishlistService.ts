"use server";

import { WishlistItem } from "@/types/wishlist";
import { cookies } from "next/headers";

const url = `${process.env.API_URL}/wishlist/wishlist-items/`;

export async function getWishistItems() {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${cookies().get("token")?.value}`,
      "Content-Type": "application/json",
    },
  });
  const result: WishlistItem[] = await res.json();
  return result;
}

export async function addItemToWishist(
  productSlug: string
): Promise<[WishlistItem, boolean]> {
  const data = { product_slug: productSlug };
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${cookies().get("token")?.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result: WishlistItem = await res.json();
  return [result, res.ok];
}

export async function removeItemFromWishlist(productSlug: string) {
  const deleteUrl = `${url}${productSlug}/`;
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
