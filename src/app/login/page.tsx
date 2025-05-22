
// LoginForm, Logo, getCurrentUser, Card components are no longer needed here.
import { redirect } from "next/navigation";

export default async function LoginPage() {
  // The concept of a logged-in user is removed from this flow.
  // Simply redirect to the new homepage.
  redirect("/");

  // Fallback return, should be unreachable.
  return null; 
}
