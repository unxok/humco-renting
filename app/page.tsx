import sbServer from "@/utils/supabase/SupabaseClients/sbServer";
import getListings from "./actions/getListings";
import { Suspense } from "react";
import { Listings } from "@/components/Listings";

export const dynamic = "force-dynamic";

export default async function Index() {
  return (
    <div>
      hi
      <Suspense>
        <Listings />
      </Suspense>
    </div>
  );
}
