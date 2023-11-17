export async function POST(request: Request) {
  const data = await request.json();
  const url = `${process.env.API_URL}/user/register/`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return Response.json(result, { status: res.status });
}
