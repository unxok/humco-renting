import sbServer from "@/utils/supabase/SupabaseClients/sbServer";
import { ImageCarousel } from "../ImageCarousel";
import { SocialBar } from "../Listings/SocialBar";

import { ImageBanner } from "./ImageBanner";
import { ListingHeader, ListingHeaderProps } from "./ListingHeader";
import { ListingAccordion } from "./ListingAccordion";
import { Suspense } from "react";
import { Loading } from "../Loading";

export const SingleListing = async ({
  listingId,
  searchParams,
}: {
  listingId: number;
  searchParams: { [key: string]: any };
}) => {
  const db = sbServer();
  const { data, error } = await db
    .from("listings")
    .select(
      "*, property_managements (id, name, logo_url, individual_listing_url)",
    )
    .eq("id", listingId);
  // console.log("queried data", data);
  // console.log("any errors in getting listing?", error);
  if (searchParams.hasOwnProperty("pictures")) {
    return (
      <Suspense fallback={<Loading h={100} w={100} />}>
        <ImageCarousel listingId={listingId} images={data?.[0].picture_urls} />
      </Suspense>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center pt-5 p-1 gap-2 w-full bg-secondary md:w-3/4 relative">
      <ListingHeader data={data} />
      <ImageBanner listingId={listingId} data={data} />
      <SocialBar likes={data?.[0].likes as number}></SocialBar>
      <ListingAccordion data={data} />
    </div>
  );
};
