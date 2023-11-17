import { cookies } from "next/headers";

export async function POST(request: Request) {
  const data = await request.json();
  const url = `${process.env.API_URL}/user/customer/login/`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();

  const mins_45 = 45 * 60 * 1000;
  Object.keys(result).forEach((key) => {
    cookies().set(key, result[key], {
      expires: Date.now() + mins_45,
      httpOnly: true,
    });
  });
  return Response.json(result, { status: res.status });
}
