import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default function sbServer() {
  cookies().getAll();
  return createServerComponentClient<Database>({ cookies });
}
