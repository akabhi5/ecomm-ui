import { cookies } from "next/headers";

const url = `${process.env.API_URL}/cart/cart-items/`;

export async function GET() {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("token")?.value}`,
    },
  });
  const result = await res.json();
  return Response.json(result, { status: res.status });
}

export async function POST(request: Request) {
  const data = await request.json();
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${cookies().get("token")?.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return Response.json(result, { status: res.status });
}

export async function PATCH(request: Request) {
  const data = await request.json();
  const deleteUrl = `${url}${data.productSlug}/`;
  const res = await fetch(deleteUrl, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${cookies().get("token")?.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity: data.quantity }),
  });
  return Response.json({ status: res.status });
}

export async function DELETE(request: Request) {
  const data = await request.json();
  const deleteUrl = `${url}${data.productSlug}/`;
  const res = await fetch(deleteUrl, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${cookies().get("token")?.value}`,
      "Content-Type": "application/json",
    },
  });
  return Response.json({ status: res.status });
}
