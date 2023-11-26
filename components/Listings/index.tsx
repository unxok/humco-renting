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
    .select("id, name, logo_url, brand_color");
  const propertyManagements = propertyManagementsQuery.data
    ? propertyManagementsQuery.data
    : [];
  const pmMap: { [key: number]: any } = propertyManagements.reduce(
    (map, pm) => {
      return {
        ...map,
        [pm.id]: {
          name: pm.name,
          logo: pm.logo_url,
          brand_color: pm.brand_color,
        },
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
    <div className='w-full p-10 bg-slate-800'>
      All Listings
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3'>
        {data &&
          data.map((l, i) => (
            <div
              key={i}
              className={`border h-[55vh] relative rounded-md rounded-t-3xl w-full text-center text-white`}
              style={{
                backgroundColor:
                  pmMap[l.property_management_id as number].brand_color,
              }}
            >
              <PmHeader
                pmName={pmMap[l.property_management_id as number].name}
              />
              <Thumbnail l={l} pmMap={pmMap} />
              <div className='flex flex-col h-[40%] justify-between bg-white'>
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
