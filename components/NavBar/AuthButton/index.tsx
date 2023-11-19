import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { Button } from "../../ui/button";

export default async function AuthButton({ user }: { user: User | null }) {
  // const signOut = async () => {
  //   "use server";

  //   const cookieStore = cookies();
  //   const supabase = createClient(cookieStore);
  //   await supabase.auth.signOut();
  //   return redirect("/login");
  // };

  return user ? (
    <div className='flex items-center gap-4'>
      Hey, {user.email}!
      <form action='/actions/sign-out'>
        <Button>Logout</Button>
      </form>
    </div>
  ) : (
    <Button>
      <Link href='/login'>Login</Link>
    </Button>
  );
}
