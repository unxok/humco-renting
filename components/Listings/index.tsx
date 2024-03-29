import sbServer from "@/utils/supabase/SupabaseClients/sbServer";

import { PmHeader } from "./PmHeader";
import { Thumbnail } from "./Thumbnail";
import { CardContent } from "./CardContent";
import { SocialBar } from "./SocialBar";

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
    {},
  );

  const numberFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  return (
    // TODO fade in isn't working and idk why
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 bg-transparent">
      {data &&
        data.map((l, i) => (
          <div
            key={i}
            className={`border relative rounded-b-md rounded-t-lg w-full text-center animate-fade-in`}
            style={{
              backgroundColor:
                pmMap[l.property_management_id as number].brand_color,
            }}
          >
            <PmHeader pmName={pmMap[l.property_management_id as number].name} />
            <Thumbnail l={l} pmMap={pmMap} />
            <div className="flex flex-col h-[40%] justify-between bg-secondary ">
              <CardContent l={l} numberFormatter={numberFormatter} />
              <SocialBar likes={l.likes} />
            </div>
          </div>
        ))}
    </div>
  );
};
