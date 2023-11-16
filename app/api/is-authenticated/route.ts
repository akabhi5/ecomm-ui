import { isAuthenticated } from "@/middleware";
import { cookies } from "next/headers";

export async function GET() {
  const userIdStr = cookies().get("id")?.value;
  const userId = userIdStr !== undefined ? parseInt(userIdStr) : -1;

  const userObj = {
    isAuthenticated: isAuthenticated(),
    user: {
      name: cookies().get("name")?.value,
      email: cookies().get("email")?.value,
      token: cookies().get("token")?.value,
      id: userId,
    },
  };

  return Response.json(userObj);
}
