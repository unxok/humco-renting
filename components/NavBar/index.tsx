import Link from "next/link";
import AuthButton from "./AuthButton";
import { User } from "@supabase/supabase-js";
import { MobileLinks } from "./MobileLinks";

export const NavBar = ({ user }: { user: User | null }) => {
  return (
    <nav className='top-0 w-full flex justify-center border-b border-b-foreground/10 h-16 bg-accent'>
      <div className='w-full flex justify-between items-center p-3 text-sm'>
        <MobileLinks />
        <div className='text-xl md:text-4xl font-bold md:tracking-widest text-primary'>
          <Link scroll={false} href={"/"}>
            HumCoRenting
          </Link>
        </div>
        <div>
          <Link href={"/listings"}>All Listings</Link>
        </div>
        <AuthButton user={user} />
      </div>
    </nav>
  );
};
