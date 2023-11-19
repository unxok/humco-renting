import getListings from "@/app/actions/getListings";
import sbServer from "@/utils/supabase/SupabaseClients/sbServer";
import { Suspense } from "react";

export const Listings = async () => {
  const db = sbServer();
  const {
    data: { user },
  } = await db.auth.getUser();

  const listings = await getListings();

  return (
    <>
      {listings.map((l) => (
        <div key={l.listable_uid}>{l.full_address}</div>
      ))}
    </>
  );
};
