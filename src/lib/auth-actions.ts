
"use server";

// cookies import is no longer needed.
import { redirect } from "next/navigation";

// SESSION_COOKIE_NAME and MOCK_USER are no longer relevant.

export interface Session {
  userId: string; // Kept for potential type compatibility if other parts use it.
  userName: string; // Kept for potential type compatibility.
  isLoggedIn: boolean; // This would effectively always be false or the Session object null.
}

// LoginState and the login function are no longer part of the primary flow.
// They can be removed or heavily simplified if not used elsewhere.
/*
interface LoginState {
  success: boolean;
  message: string;
}

export async function login(prevState: LoginState, formData: FormData): Promise<LoginState> {
  // This function is not actively used in the new no-auth flow.
  console.warn("Login function called, but authentication is disabled in the current flow.");
  return { success: false, message: "Authentication is disabled." };
}
*/

export async function logout() {
  // No session cookie to delete.
  redirect("/"); // Redirect to the new home page.
}

export async function getSession(): Promise<Session | null> {
  // No session cookie to parse.
  return null; // Always return null as there's no session.
}
