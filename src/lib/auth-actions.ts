// @ts-nocheck because it needs to be a server component to set cookies, but we are not using react hooks
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE_NAME = "remoteflow_session";
// Mock user credentials
const MOCK_USER = {
  email: "user@example.com",
  password: "password123",
  name: "Demo User",
  id: "1",
};

export interface Session {
  userId: string;
  userName: string;
  isLoggedIn: boolean;
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Simulate database lookup & password check
  if (email === MOCK_USER.email && password === MOCK_USER.password) {
    const sessionData: Session = {
      userId: MOCK_USER.id,
      userName: MOCK_USER.name,
      isLoggedIn: true,
    };
    cookies().set(SESSION_COOKIE_NAME, JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // One week
      path: "/",
    });
    return { success: true, message: "Login successful" };
  } else {
    return { success: false, message: "Invalid email or password" };
  }
}

export async function logout() {
  cookies().delete(SESSION_COOKIE_NAME);
  redirect("/login");
}

export async function getSession(): Promise<Session | null> {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME);
  if (sessionCookie) {
    try {
      return JSON.parse(sessionCookie.value) as Session;
    } catch (error) {
      console.error("Failed to parse session cookie:", error);
      return null;
    }
  }
  return null;
}
