import { Database } from "@/types/supabase";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default function sbAction() {
  cookies().getAll();
  return createServerActionClient<Database>({ cookies });
}
