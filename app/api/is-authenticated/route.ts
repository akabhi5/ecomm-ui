import { isAuthenticated } from "@/middleware";
import { cookies } from "next/headers";

export async function GET() {
  const userObj = {
    isAuthenticated: isAuthenticated(),
    user: {
      name: cookies().get("name")?.value,
      email: cookies().get("email")?.value,
      token: cookies().get("token")?.value,
    },
  };

  return Response.json(userObj);
}
