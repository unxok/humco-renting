import { Database } from "@/types/supabase";
import Image from "next/image";
import Link from "next/link";

export type ListingHeaderProps = {
  // shamefully put any here, couldn't get below to work.
  // TODO future me can fix this
  data: any;
  // | (Database["public"]["Tables"]["listings"]["Row"] & {
  //     property_managements: Database["public"]["Tables"]["property_managements"]["Row"];
  //   })[]
  // | null;
};

export const ListingHeader = ({ data }: ListingHeaderProps) => (
  <div className="flex justify-center flex-col">
    <div className='w-full flex justify-center items-center text-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"'>
      {data?.[0].full_address}
    </div>
    <div className="w-full flex justify-center items-center text-xl text-muted-foreground">
      {data?.[0].description}
    </div>
    <div className="w-full flex justify-center items-center gap-5 p-3">
      <span className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {data?.[0]?.property_managements?.name}
      </span>
      <Image
        src={data?.[0]?.property_managements?.logo_url as string}
        alt="Property Management Logo"
        width={150}
        height={150}
      />
    </div>
    <Link
      href={`${data?.[0]?.property_managements?.individual_listing_url}/${data?.[0].page_url}`}
      target="_blank"
      className="text-primary underline hover:underline w-full text-center"
    >
      Go to Original Listing →
    </Link>
  </div>
);
