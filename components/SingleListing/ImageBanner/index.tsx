import { buttonVariants } from "@/components/ui/button";
import { Database } from "@/types/supabase";
import { cn } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

type ImageBannerProps = {
  listingId: number;
  data: Database["public"]["Tables"]["listings"]["Row"][] | null;
};

export const ImageBanner = ({ listingId, data }: ImageBannerProps) => {
  return (
    <div className="w-full py-3 flex flex-col items-center justify-center bg-secondary-foreground">
      {/* <ImageCarousel images={data?.[0].picture_urls} /> */}
      <div
        className={`grid items-center gap-5 p-1 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3`}
      >
        <Link
          href={`/listings/${listingId}/?pictures=true&index=0`}
          scroll={false}
        >
          <Image
            className="h-auto rounded-xl hover:cursor-zoom-in"
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
              className="h-auto rounded-xl hidden lg:block"
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
              className="h-auto rounded-xl hidden xl:block"
              src={data?.[0].picture_urls?.[2] as string}
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
          "font-semibold flex justify-center items-center flex-col w-max",
        )}
      >
        <span className="flex flex-row items-center justify-center gap-1">
          <span className="">{data?.[0]?.picture_urls?.length + " total"}</span>
          <span>→</span>
        </span>
      </Link>
    </div>
  );
};
