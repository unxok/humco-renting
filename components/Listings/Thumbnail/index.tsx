import { Database } from "@/types/supabase";
import Image from "next/image";
import Link from "next/link";

type Listing = Database["public"]["Tables"]["listings"]["Row"];

type PmMap = {
  [key: string]: any;
};

export const Thumbnail = ({ l, pmMap }: { l: Listing; pmMap: PmMap }) => (
  <div className='w-full h-1/2 border relative'>
    <img
      src={l.thumbnail_url ? l.thumbnail_url : ""}
      alt='Listing Photo'
      className='w-full h-full self-center'
    />
    <Image
      width={100}
      height={100}
      alt={pmMap[l.property_management_id as number]}
      src={pmMap[l.property_management_id as number]["logo"]}
      className='absolute bottom-0 right-0'
    />
    <Link
      scroll={true}
      href={`listings/${l.id}`}
      className='hover:underline hover:underline-offset-1 absolute bottom-0 left-0 w-2/3 text-shadow shadow-black text-white'
    >{`${l.address_street1}, ${l.address_city}, CA ${l.address_zip}`}</Link>
  </div>
);
