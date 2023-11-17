import { cookies } from "next/headers";

interface Props {
  params: { product: string };
}

export async function GET(request: Request, { params }: Props) {
  const url = `${process.env.API_URL}/review/product/${params.product}/`;
  const res = await fetch(url);
  const result = await res.json();
  return Response.json(result);
}

export async function POST(request: Request, { params }: Props) {
  const url = `${process.env.API_URL}/review/product/${params.product}/`;
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

export async function DELETE(request: Request, { params }: Props) {
  const url = `${process.env.API_URL}/review/product/${params.product}/`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${cookies().get("token")?.value}`,
      "Content-Type": "application/json",
    },
  });
  return Response.json({ status: res.status });
}
