import sbServer from "@/utils/supabase/SupabaseClients/sbServer";

import { PmHeader } from "./PmHeader";
import { Thumbnail } from "./Thumbnail";
import { CardContent } from "./CardContent";
import { SocialBar } from "./SocialBar";
import { FiltersState } from "@/app/listings/parseSearchParams";

export const Listings = async ({
  paramsState,
}: {
  paramsState: FiltersState;
}) => {
  const selectedCities = Object.keys(
    paramsState.cities as NonNullable<FiltersState["cities"]>,
  )
    .map((key) => {
      if (paramsState?.cities?.[key]) {
        return key;
      }
    })
    .filter((city) => city !== undefined);

  const db = sbServer();
  // TODO just do a join instead of the pmMap thing???
  const { data, error } = await db
    .from("listings")
    .select("*")
    .gte("rent", paramsState.rent[0])
    .lte("rent", paramsState.rent[1])
    .in("address_city", selectedCities)
    .gte("bedrooms", paramsState.bedrooms.min)
    .lte("bedrooms", paramsState.bedrooms.max)
    .gte("bathrooms", paramsState.bathrooms.min)
    .lte("bathrooms", paramsState.bathrooms.max)
    .eq(
      paramsState.pets.cats ? "cats_allowed" : "admin_hidden",
      paramsState.pets.cats,
    )
    .eq(
      paramsState.pets.dogs ? "dogs_allowed" : "admin_hidden",
      paramsState.pets.dogs,
    );

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
    <div className="grid grid-cols-1 auto-rows-[450px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 bg-transparent">
      {data &&
        data.map((l, i) => (
          <div
            key={i}
            className={`border relative rounded-b-md rounded-t-lg text-center flex flex-col justify-end animate-fade-in`}
            style={{
              backgroundColor:
                pmMap[l.property_management_id as number].brand_color,
            }}
          >
            <PmHeader pmName={pmMap[l.property_management_id as number].name} />
            <Thumbnail l={l} pmMap={pmMap} />
            <div className="flex flex-col justify-between bg-secondary ">
              <CardContent l={l} numberFormatter={numberFormatter} />
              <SocialBar likes={l.likes} />
            </div>
          </div>
        ))}
    </div>
  );
};
