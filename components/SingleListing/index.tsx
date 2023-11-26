import sbServer from "@/utils/supabase/SupabaseClients/sbServer";
import Image from "next/image";
import { ImageCarousel } from "../ImageCarousel";
import RightArrow from "@/app/resources/svg/RightArrow.svg";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/utils";
import { Database } from "@/types/supabase";
import { ListingInformation } from "./ListingInformation";
import { Footer } from "../Listings/Footer/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

  return (
    <div className='flex flex-col justify-center items-center pt-5 p-1 gap-2 bg-stone-200'>
      <div className='w-full flex justify-center items-center text-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"'>
        {data?.[0].full_address}
      </div>
      <div className='w-full flex justify-center items-center text-xl text-muted-foreground'>
        {data?.[0].description}
      </div>
      <div className='w-full flex justify-center items-center font-bold font-sans gap-5 p-3'>
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
        className='text-primary underline hover:underline'
      >
        Go to Original Listing →
      </Link>
      <div className=' w-[100vw] flex flex-col items-center justify-center bg-gray-800 p-1'>
        {/* <ImageCarousel images={data?.[0].picture_urls} /> */}
        <div className={`grid items-center justify-center p-1 grid-cols-1`}>
          <Link
            href={`/listings/${listingId}/?pictures=true&index=0`}
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
              href={`/listings/${listingId}/?pictures=true&index=1`}
              scroll={false}
            >
              <Image
                className='h-auto rounded-xl hidden'
                src={data?.[0].picture_urls?.[1] as string}
                alt={`picture failed to load or doesn't exist`}
                width={300}
                height={300}
              />
            </Link>
          )}
          {data?.[0].picture_urls?.[2] && (
            <Link
              href={`/listings/${listingId}/?pictures=true&index=2`}
              scroll={false}
            >
              <Image
                className='h-auto rounded-xl hidden'
                src={data?.[0].picture_urls?.[2] as string}
                alt={`picture failed to load or doesn't exist`}
                width={300}
                height={300}
              />
            </Link>
          )}
          {data?.[0].picture_urls?.[3] && (
            <Link
              href={`/listings/${listingId}/?pictures=true&index=3`}
              scroll={false}
            >
              <Image
                className='h-auto rounded-xl hidden'
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
      <div className='w-full'>
        <Footer likes={data?.[0].likes as number}></Footer>
      </div>
      <Accordion
        className='w-full bg-white rounded-md'
        // defaultValue='item-1'
        type='multiple'
        // collapsible
      >
        <AccordionItem value='item-1' className='border border-b-gray-300 p-1'>
          <AccordionTrigger>Listing Details</AccordionTrigger>
          <AccordionContent>
            <ListingInformation data={data} numberFormatter={numberFormatter} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2' className='border border-b-gray-300 p-1'>
          <AccordionTrigger>Full Description</AccordionTrigger>
          <AccordionContent>
            <div
              dangerouslySetInnerHTML={{
                __html: data?.[0]?.long_description as string,
              }}
            ></div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
