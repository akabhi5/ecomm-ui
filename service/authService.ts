"use server";

/*
 *  server actions must be async
 */

// import { SignJWT, jwtVerify } from "jose";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// const secretKey = "secret";
// const key = new TextEncoder().encode(secretKey);

// export async function encrypt(payload: any) {
//   return await new SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime("10 sec from now")
//     .sign(key);
// }

// export async function decrypt(input: string): Promise<any> {
//   const { payload } = await jwtVerify(input, key, {
//     algorithms: ["HS256"],
//   });
//   return payload;
// }

async function clearAuthCookie() {
  cookies().delete("token");
  cookies().delete("name");
  cookies().delete("email");
  cookies().delete("id");
}

export async function login(email: string, password: string) {
  const user = { email: email, password: password };
  const url = `${process.env.API_URL}/user/customer/login/`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const result = await res.json();

  if (res.ok) {
    const oneHour = 60 * 60 * 1000;
    const oneDay = oneHour * 24;
    const days_999 = oneDay * 999;
    Object.keys(result).forEach((key) => {
      cookies().set(key, result[key], {
        expires: Date.now() + days_999,
        httpOnly: true,
      });
    });
    return [true, result];
  } else {
    return [false, {}];
  }
}

export async function logout() {
  clearAuthCookie();
}

export const isAuthenticated = () => {
  const result =
    cookies().has("token") && cookies().has("email") && cookies().has("name");
  // if (!result) clearAuthCookie(); not working
  return result;
};

export async function getUserObj() {
  const userObj = {
    isAuthenticated: isAuthenticated(),
    user: {
      name: cookies().get("name")?.value,
      email: cookies().get("email")?.value,
      token: cookies().get("token")?.value,
      id: cookies().get("id")?.value,
    },
  };
  return userObj;
}

// export async function getSession() {
//   const session = cookies().get("session")?.value;
//   if (!session) return null;
//   return await decrypt(session);
// }

// export async function updateSession(request: NextRequest) {
//   const session = request.cookies.get("session")?.value;
//   if (!session) return;

//   // Refresh the session so it doesn't expire
//   const parsed = await decrypt(session);
//   parsed.expires = new Date(Date.now() + 10 * 1000);
//   const res = NextResponse.next();
//   res.cookies.set({
//     name: "session",
//     value: await encrypt(parsed),
//     httpOnly: true,
//     expires: parsed.expires,
//   });
//   return res;
// }

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const data = { name, email, password };
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
  if (res.ok) {
    return [result, true];
  }
  return [result, false];
}
