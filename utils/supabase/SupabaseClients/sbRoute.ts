import { Database } from "@/types/supabase";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default function sbRoute() {
  cookies().getAll();
  return createRouteHandlerClient<Database>({ cookies });
}
