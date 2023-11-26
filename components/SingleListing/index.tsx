import sbServer from "@/utils/supabase/SupabaseClients/sbServer";
import Image from "next/image";
import { ImageCarousel } from "../ImageCarousel";
import RightArrow from "@/app/resources/svg/RightArrow.svg";
import Link from "next/link";

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
    .select("*")
    .eq("id", listingId);
  // console.log("queried data", data);
  // console.log("any errors in getting listing?", error);
  if (searchParams.hasOwnProperty("pictures")) {
    return (
      <ImageCarousel listingId={listingId} images={data?.[0].picture_urls} />
    );
  }

  return (
    <div className=' w-[100vw] flex flex-col'>
      I am a listing! {listingId}
      {/* <ImageCarousel images={data?.[0].picture_urls} /> */}
      <div className='grid grid-cols-4 items-center bg-slate-400 p-3'>
        <Image
          className=''
          src={data?.[0].picture_urls?.[0] as string}
          alt={`picture`}
          width={300}
          height={300}
        />
        <Image
          className=''
          src={data?.[0].picture_urls?.[1] as string}
          alt={`picture`}
          width={300}
          height={300}
        />
        <Image
          className=''
          src={data?.[0].picture_urls?.[3] as string}
          alt={`picture`}
          width={300}
          height={300}
        />
        <div className='font-extrabold text-primary text-3xl bg-white h-full flex justify-center items-center flex-col'>
          <span>View All Pictures</span>
          <Link href={`/listings/${listingId}?pictures`}>
            <Image
              src={RightArrow}
              alt='View Pictures'
              width={40}
              height={40}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
