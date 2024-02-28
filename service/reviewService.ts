"use server";

import { Review } from "@/types/review";
import { cookies } from "next/headers";

interface Props {
  params: { product: string };
}

export async function getProductReviews(productSlug: string) {
  const url = `${process.env.API_URL}/review/product/${productSlug}/`;
  const res = await fetch(url);
  const result = await res.json();
  return result;
}

export async function addProductReview(
  productSlug: string,
  comment: string
): Promise<[boolean, Review, number]> {
  const res = await fetch(
    `${process.env.API_URL}/review/product/${productSlug}/`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${cookies().get("token")?.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: comment }),
    }
  );
  const result: Review = await res.json();
  return [res.ok, result, res.status];
}

export async function deleteProductReview(
  productSlug: string
): Promise<boolean> {
  const url = `${process.env.API_URL}/review/product/${productSlug}/`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${cookies().get("token")?.value}`,
      "Content-Type": "application/json",
    },
  });
  if (res.ok) return true;
  return false;
}
