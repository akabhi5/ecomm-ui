import { cookies } from "next/headers";

export async function POST() {
  cookies().delete("token");
  cookies().delete("name");
  cookies().delete("email");
  return Response.json({});
}
