import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Link from "next/link";
import AuthButton from "@/components/NavBar/AuthButton";
import sbServer from "@/utils/supabase/SupabaseClients/sbServer";
import { NavBar } from "@/components/NavBar";
import { ReactNode } from "react";

export const metadata = {
  title: "HumCoRenting",
  description: "The one stop spot for rentals in Humboldt County",
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
    <html lang='en' className={GeistSans.className}>
      <body className='bg-background text-foreground'>
        <main className='min-h-screen flex flex-col items-center'>
          <NavBar user={user}></NavBar>
          <div className='z-[99998] bg-accent flex flex-col justify-center items-center'>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
