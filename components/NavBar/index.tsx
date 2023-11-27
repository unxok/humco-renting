import Link from "next/link";
import AuthButton from "./AuthButton";
import { User } from "@supabase/supabase-js";
import { MobileLinks } from "./MobileLinks";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { cookies } from "next/headers";

export const NavBar = ({ user }: { user: User | null }) => {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 bg-accent sm:bg-green-300 md:bg-red-400 lg:bg-purple-400 xl:bg-orange-500 2xl:bg-blue-400 top-0">
      <div className="w-full flex justify-between items-center p-3 text-sm">
        <div className="flex flex-row gap-3">
          <MobileLinks />
          <div className="text-xl md:text-4xl font-bold md:tracking-widest text-primary">
            <Link scroll={false} href={"/"}>
              HumCoRenting
            </Link>
          </div>
        </div>
        <ThemeSwitcher
          theme={cookies().get("theme")?.value as "light" | "dark"}
        />
        <div className="hidden md:block">
          <Link href={"/listings"}>All Listings</Link>
        </div>
        <AuthButton user={user} />
      </div>
    </nav>
  );
};
