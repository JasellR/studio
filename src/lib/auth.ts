import { cookies } from "next/headers";
import type { Session } from "./auth-actions";

const SESSION_COOKIE_NAME = "remoteflow_session";

export async function getCurrentUser(): Promise<Session | null> {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME);
  if (sessionCookie) {
    try {
      const session = JSON.parse(sessionCookie.value) as Session;
      if (session.isLoggedIn) {
        return session;
      }
      return null;
    } catch (error) {
      console.error("Failed to parse session cookie:", error);
      return null;
    }
  }
  return null;
}
