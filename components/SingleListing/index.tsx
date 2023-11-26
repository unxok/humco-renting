import sbServer from "@/utils/supabase/SupabaseClients/sbServer";
import Image from "next/image";
import { ImageCarousel } from "../ImageCarousel";
import RightArrow from "@/app/resources/svg/RightArrow.svg";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/utils";
import { Database } from "@/types/supabase";

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
      "*, property_managements (id, name, logo_url, individual_listing_url)"
    )
    .eq("id", listingId);
  // console.log("queried data", data);
  // console.log("any errors in getting listing?", error);
  if (searchParams.hasOwnProperty("pictures")) {
    return (
      <ImageCarousel listingId={listingId} images={data?.[0].picture_urls} />
    );
  }

  const numberFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  const picLen = data?.[0].picture_urls?.length as number;
  const gridCols =
    picLen > 3 ? 4 : picLen > 2 ? 3 : picLen > 1 ? 2 : picLen > 0 ? 1 : 0;
  const fullGridCols = "grid-cols-" + gridCols;
  console.log(fullGridCols);
  return (
    <div className='flex flex-col justify-center items-center pt-5 gap-2 bg-stone-200'>
      <div className='w-full flex justify-center items-center text-3xl font-semibold font-sans tracking-widest'>
        {data?.[0].full_address}
      </div>
      <div className='w-full flex justify-center items-center italic font-sans'>
        {data?.[0].description}
      </div>
      <div className='w-full flex justify-center items-center font-bold font-sans gap-5'>
        <span>{data?.[0]?.property_managements?.name}</span>
        <Image
          src={data?.[0]?.property_managements?.logo_url as string}
          alt='Property Management Logo'
          width={150}
          height={150}
        ></Image>
      </div>
      <Link
        href={`${data?.[0]?.property_managements?.individual_listing_url}/${data?.[0].page_url}`}
        target='_blank'
        className='text-primary hover:underline'
      >
        Go to Original Listing →
      </Link>
      <div className=' w-[100vw] flex flex-col items-center justify-around bg-neutral-400 p-5'>
        {/* <ImageCarousel images={data?.[0].picture_urls} /> */}
        <div
          className={cn(
            `grid items-center justify-center gap-5 p-3`,
            fullGridCols
          )}
        >
          <Link
            href={`/listings/${listingId}/?pictures&index=0`}
            scroll={false}
          >
            <Image
              className='h-auto rounded-xl'
              src={data?.[0].picture_urls?.[0] as string}
              alt={`picture failed to load or doesn't exist`}
              width={300}
              height={300}
            />
          </Link>
          {data?.[0].picture_urls?.[1] && (
            <Link
              href={`/listings/${listingId}/?pictures&index=1`}
              scroll={false}
            >
              <Image
                className='h-auto rounded-xl'
                src={data?.[0].picture_urls?.[1] as string}
                alt={`picture failed to load or doesn't exist`}
                width={300}
                height={300}
              />
            </Link>
          )}
          {data?.[0].picture_urls?.[2] && (
            <Link
              href={`/listings/${listingId}/?pictures&index=2`}
              scroll={false}
            >
              <Image
                className='h-auto rounded-xl'
                src={data?.[0].picture_urls?.[2] as string}
                alt={`picture failed to load or doesn't exist`}
                width={300}
                height={300}
              />
            </Link>
          )}
          {data?.[0].picture_urls?.[3] && (
            <Link
              href={`/listings/${listingId}/?pictures&index=3`}
              scroll={false}
            >
              <Image
                className='h-auto rounded-xl'
                src={data?.[0].picture_urls?.[3] as string}
                alt={`picture failed to load or doesn't exist`}
                width={300}
                height={300}
              />
            </Link>
          )}
        </div>
        <Link
          scroll={false}
          href={`/listings/${listingId}?pictures`}
          className={cn(
            buttonVariants({ variant: "default" }),
            "font-semibold flex justify-center items-center flex-col w-max"
          )}
        >
          <span className='flex flex-row items-center justify-center gap-1'>
            <span className=''>
              {data?.[0]?.picture_urls?.length + " total"}
            </span>
            <span>→</span>
          </span>
        </Link>
      </div>
      <div className='flex justify-center items-center flex-wrap gap-5 border w-[99%] p-3'>
        <div className='p-5 rounded-md bg-white flex items-center justify-center flex-col gap-5'>
          <h2 className='text-3xl'>Likes</h2>
          <span className='text-primary text-xl'>
            {data?.[0]?.likes || data?.[0].likes === 0 ? (
              data?.[0]?.likes
            ) : (
              <span className='text-red-500'>?</span>
            )}
          </span>
        </div>
        <div className='p-5 rounded-md bg-white flex items-center justify-center flex-col gap-5'>
          <h2 className='text-3xl'>Comments</h2>
          <span className='text-primary text-xl'>
            {data?.[0]?.likes || data?.[0].likes === 0 ? (
              data?.[0]?.likes
            ) : (
              <span className='text-red-500'>?</span>
            )}
          </span>
        </div>
        <div className='p-5 rounded-md bg-white flex items-center justify-center flex-col gap-5'>
          <h2 className='text-3xl'>Shares</h2>
          <span className='text-primary text-xl'>
            {data?.[0]?.likes || data?.[0].likes === 0 ? (
              data?.[0]?.likes
            ) : (
              <span className='text-red-500'>?</span>
            )}
          </span>
        </div>
      </div>
      <div className='flex justify-center items-center bg-neutral-100 flex-wrap gap-5 w-[99%] p-3 border'>
        <div className='border p-5 rounded-md bg-white flex items-center justify-center flex-col gap-5'>
          <h2 className='text-3xl'>Available Date</h2>
          <span className='text-primary text-xl'>
            {data?.[0]?.available_date ? (
              data?.[0]?.available_date
            ) : (
              <span className='text-red-500'>?</span>
            )}
          </span>
        </div>
        <div className='border p-5 rounded-md bg-white flex items-center justify-center flex-col gap-5'>
          <h2 className='text-3xl'>Monthly Rent</h2>
          <span className='text-primary text-xl'>
            {numberFormatter.format(data?.[0]?.rent as number)}
          </span>
        </div>
        <div className='border p-5 rounded-md bg-white flex items-center justify-center flex-col gap-5'>
          <h2 className='text-3xl'>Security Deposit</h2>
          <span className='text-primary text-xl'>
            {data?.[0]?.security_deposit
              ? numberFormatter.format(data?.[0]?.security_deposit)
              : "none"}
          </span>
        </div>
        <div className='border p-5 rounded-md bg-white flex items-center justify-center flex-col gap-5'>
          <h2 className='text-3xl'>Bedrooms</h2>
          <span className='text-primary text-xl'>
            {data?.[0]?.bedrooms ? (
              data?.[0]?.bedrooms
            ) : (
              <span className='text-red-500'>?</span>
            )}
          </span>
        </div>
        <div className='border p-5 rounded-md bg-white flex items-center justify-center flex-col gap-5'>
          <h2 className='text-3xl'>Bathrooms</h2>
          <span className='text-primary text-xl'>
            {data?.[0]?.bathrooms ? (
              data?.[0]?.bathrooms
            ) : (
              <span className='text-red-500'>?</span>
            )}
          </span>
        </div>
        <div className='border p-5 rounded-md bg-white flex items-center justify-center flex-col gap-5'>
          <h2 className='text-3xl'>Application Fee</h2>
          <span className='text-primary text-xl'>
            {data?.[0]?.application_fee
              ? numberFormatter.format(data?.[0]?.application_fee)
              : "none"}
          </span>
        </div>
        <div className='border p-5 rounded-md bg-white flex items-center justify-center flex-col gap-5'>
          <h2 className='text-3xl'>Sq Ft</h2>
          <span className='text-primary text-xl'>
            {data?.[0]?.square_feet ? (
              data?.[0]?.square_feet
            ) : (
              <span className='text-red-500'>?</span>
            )}
          </span>
        </div>
        <div className='border p-5 rounded-md bg-white flex items-center justify-center flex-col gap-5'>
          <h2 className='text-3xl'>Cats</h2>
          <span className='text-primary text-xl'>
            {data?.[0]?.cats_allowed ? (
              "Yes"
            ) : (
              <span className='text-red-500'>No</span>
            )}
          </span>
        </div>
        <div className='border p-5 rounded-md bg-white flex items-center justify-center flex-col gap-5'>
          <h2 className='text-3xl'>Dogs</h2>
          <span className='text-primary text-xl'>
            {data?.[0]?.dogs_allowed ? (
              "Yes"
            ) : (
              <span className='text-red-500'>No</span>
            )}
          </span>
        </div>
        <div className='border p-5 rounded-md bg-white flex items-center justify-center flex-col gap-5'>
          <h2 className='text-3xl'>House Type</h2>
          <span className='text-primary text-xl'>
            {data?.[0]?.building_type ? (
              data?.[0]?.building_type
            ) : (
              <span className='text-red-500'>?</span>
            )}
          </span>
        </div>
        <div className='border p-5 rounded-md bg-white flex items-center justify-center flex-col gap-5'>
          <h2 className='text-3xl'>Amenities</h2>
          <span className='text-primary text-xl'>
            {data?.[0]?.amenities ? (
              data?.[0]?.amenities
            ) : (
              <span className='text-red-500'>?</span>
            )}
          </span>
        </div>
        <div className='border p-5 rounded-md bg-white flex items-center justify-center flex-col gap-5'>
          <h2 className='text-3xl'>Lease Length</h2>
          <span className='text-primary text-xl'>
            {data?.[0]?.lease_length ? (
              data?.[0]?.lease_length
            ) : (
              <span className='text-red-500'>?</span>
            )}
          </span>
        </div>
      </div>
      <div className='border p-2 rounded-md'>
        <h2 className='text-xl'>Full Description</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: data?.[0]?.long_description as string,
          }}
        ></div>
      </div>
    </div>
  );
};
