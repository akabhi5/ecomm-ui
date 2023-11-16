import { cookies } from "next/headers";

export async function POST() {
  cookies().delete("token");
  cookies().delete("name");
  cookies().delete("email");
  cookies().delete("id");
  return Response.json({});
}
