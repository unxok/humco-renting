import getListings from "@/app/actions/getListings";
import sbServer from "@/utils/supabase/SupabaseClients/sbServer";
import { Suspense } from "react";

export const Listings = async () => {
  const db = sbServer();
  const {
    data: { user },
  } = await db.auth.getUser();

  const { data, error } = await db.from("listings").select("*");

  return (
    <div className='flex flex-col items-center justify-center gap-5 p-5 '>
      All Listings
      {data &&
        data.map((l, i) => (
          <div key={l.id + i} className='border rounded-md p-5 w-full bg-white'>
            <img
              src={l.thumbnail_url ? l.thumbnail_url : ""}
              alt='Listing Photo'
              className='w-80 h-80 self-center'
            />
            <p>Address: {l.full_address}</p>
            <p>Posted: {l.listed_at}</p>
            <p>{l.property_management_id}</p>
            <p>Description: {l.description}</p>
            <p>Rent: {l.rent}</p>
            <p>Type: {l.building_type}</p>
            <p>Square Feet: {l.square_feet}</p>
            <p>Security Deposit: {l.security_deposit}</p>
            <p>
              Available Date: {l.available_date ? l.available_date : "unknown"}
            </p>
            <p>Lease Length: {l.lease_length}</p>
            <p>Application Fee: {l.application_fee}</p>
            <p>Bedrooms: {l.bedrooms}</p>
            <p>Bathrooms: {l.bathrooms}</p>
            <p>Cats: {l.cats_allowed}</p>
            <p>Dogs: {l.dogs_allowed}</p>
            <p>Amenities: {l.amenities}</p>
          </div>
        ))}
    </div>
  );
};
