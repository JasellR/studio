
'use server';
import { redirect } from 'next/navigation';

export async function connectToHostAction(formData: FormData) {
  const host = formData.get('host') as string;
  if (host && host.trim() !== "") {
    redirect(`/dashboard/connect?host=${encodeURIComponent(host.trim())}`);
  } else {
    // Redirigir de vuelta a la página de inicio con un mensaje de error
    redirect(`/?error=${encodeURIComponent("Host address cannot be empty.")}`);
  }
}
