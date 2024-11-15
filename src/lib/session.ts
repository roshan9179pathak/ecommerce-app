import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { NextResponse } from "next/server";
// import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
if (!secretKey) {
  throw new Error("SESSION_SECRET environment variable is not set");
}

const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
  userId: string;
  expiresAt: Date;
};

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });

  const response = NextResponse.next();
  response.cookies.set({
    name: "session",
    value: session,
    httpOnly: true,
    secure: true,
    path: "/",
    expires: expiresAt,
  });

  return response;
}

export function deleteSession() {
  const response = NextResponse.next();
  response.cookies.delete("session");
  return response;
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  if (!session) return null;

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload;
  } catch (error) {
    console.log("Failed to verify session:", error);
    return null;
  }
}
