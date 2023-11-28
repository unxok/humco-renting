import { Listings } from "@/components/Listings";
import { Loading } from "@/components/Loading";
import { SearchFilters } from "@/components/SearchFilters";
import sbServer from "@/utils/supabase/SupabaseClients/sbServer";
import { Suspense } from "react";

const listings = async ({
  searchParams,
}: {
  searchParams: { [key: string]: any };
}) => {
  const db = sbServer();

  const citiesQuery = await db
    .from("listing_cities")
    .select()
    .order("address_city", { ascending: true });
  const cities = citiesQuery.error ? null : citiesQuery.data;
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full p-10">All Listings</div>
      <SearchFilters cities={cities} />
      <Suspense fallback={<Loading w={50} h={50} />}>
        <Listings searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default listings;
