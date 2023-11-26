import sbServer from "@/utils/supabase/SupabaseClients/sbServer";

import { PmHeader } from "./PmHeader";
import { Thumbnail } from "./Thumbnail";
import { CardContent } from "./CardContent";
import { Footer } from "./Footer/footer";

export const Listings = async ({
  searchParams,
}: {
  searchParams: { [key: string]: any };
}) => {
  const orderBy = {
    col: searchParams.sortby ? searchParams.sortby : "rent",
    asc: searchParams.asc === "true" ? true : false,
  };

  const db = sbServer();

  const { data, error } = await db
    .from("listings")
    .select("*")
    .order(orderBy.col, {
      ascending: orderBy.asc,
    });

  const propertyManagementsQuery = await db
    .from("property_managements")
    .select("id, name, logo_url");
  const propertyManagements = propertyManagementsQuery.data
    ? propertyManagementsQuery.data
    : [];
  const pmMap: { [key: number]: any } = propertyManagements.reduce(
    (map, pm) => {
      return {
        ...map,
        [pm.id]: { name: pm.name, logo: pm.logo_url },
      };
    },
    {}
  );

  const numberFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  return (
    <div className='w-full sm:w-[80%] lg:w-2/3'>
      All Listings
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3'>
        {data &&
          data.map((l, i) => (
            <div
              key={i}
              className='border h-[55vh] relative rounded-md w-full bg-white  text-center'
            >
              <PmHeader
                pmName={pmMap[l.property_management_id as number].name}
              />
              <Thumbnail l={l} pmMap={pmMap} />
              <div className='flex flex-col h-[40%] justify-between'>
                <CardContent l={l} numberFormatter={numberFormatter} />
                <Footer likes={l.likes} />
              </div>
              {/* <p>Type: {l.building_type}</p>
            <p>Square Feet: {l.square_feet}</p>
            <p>Security Deposit: {l.security_deposit}</p>
            <p>
            Available Date: {l.available_date ? l.available_date : "unknown"}
            </p>
            <p>Lease Length: {l.lease_length}</p>
            <p>Application Fee: {l.application_fee}</p>
        <p>Amenities: {l.amenities}</p> */}
            </div>
          ))}
      </div>
    </div>
  );
};
