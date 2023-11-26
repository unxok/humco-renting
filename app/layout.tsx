import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Link from "next/link";
import AuthButton from "@/components/NavBar/AuthButton";
import sbServer from "@/utils/supabase/SupabaseClients/sbServer";
import { NavBar } from "@/components/NavBar";
import { ReactNode } from "react";

export const metadata = {
  title: "HumCoRenting",
  metadataBase: new URL("http://localhost:3000"),
  description: "The one stop spot for rentals in Humboldt County",
  openGraph: {
    title: "HumCoRenting",
    description: "this is the desciption",
    image: "url/image.png",
  },
  twitter: {
    card: "Not configured!",
    site: "@not-configured",
    title: "HumCoRenting",
    description: "The one stop spot for rentals in Humboldt County",
    image: "url/image.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const db = sbServer();
  const {
    data: { user },
  } = await db.auth.getUser();

  return (
    <html lang='en' className={GeistSans.className + "customScrollbar"}>
      <body className='bg-background text-foreground overflow-x-hidden'>
        <main className='min-h-screen relative'>
          <NavBar user={user}></NavBar>
          {children}
        </main>
      </body>
    </html>
  );
}
