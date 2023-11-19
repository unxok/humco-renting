import Link from "next/link";
import AuthButton from "./AuthButton";
import { User } from "@supabase/supabase-js";

export const NavBar = ({ user }: { user: User | null }) => {
  return (
    <nav className='z-[99999] sticky top-0 w-full flex justify-center border-b border-b-foreground/10 h-16 bg-accent'>
      <div className='w-full flex justify-between items-center p-3 text-sm'>
        <div className='text-4xl font-bold tracking-widest text-primary'>
          <Link href={"/"}>HumCoRenting</Link>
        </div>
        <div>links... asdlfkj asldfkj laksdjf</div>
        <AuthButton user={user} />
      </div>
    </nav>
  );
};
