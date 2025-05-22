import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const user = await getCurrentUser();

  if (user && user.isLoggedIn) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }

  // This return is technically unreachable due to redirects, but good for type safety.
  return null; 
}
