"use client";

import { Loading } from "@/components/Loading";
import { Database } from "@/types/supabase";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

type Listing = Database["public"]["Tables"]["listings"]["Row"];

type PmMap = {
  [key: string]: any;
};

export const Thumbnail = ({ l, pmMap }: { l: Listing; pmMap: PmMap }) => {
  const [isLoading, setLoading] = useState(true);
  const imgRef = useRef(null);

  useEffect(() => setLoading(false), []);

  return (
    <div className=" border h-1/2 relative bg-secondary">
      {isLoading ? (
        <div className={`w-full h-full flex items-center justify-center`}>
          <Loading w={50} h={50} />
        </div>
      ) : null}
      <Link href={`/listings/${l.id}?pictures=true&listingsMode=true`}>
        <img
          src={l.thumbnail_url ? l.thumbnail_url : ""}
          alt="Listing Photo"
          loading="lazy"
          ref={imgRef}
          className="w-full h-full self-center"
          onLoad={() => setLoading(false)}
        />
      </Link>
      <Image
        fetchPriority="high"
        loading="eager"
        width={100}
        height={100}
        alt={pmMap[l.property_management_id as number]}
        src={pmMap[l.property_management_id as number]["logo"]}
        className="absolute bottom-0 right-0"
      />
      <Link
        scroll={true}
        href={`listings/${l.id}`}
        className="hover:underline hover:underline-offset-1 absolute bottom-0 left-0 w-2/3 text-shadow shadow-black text-white"
      >{`${l.address_street1}, ${l.address_city}, CA ${l.address_zip}`}</Link>
    </div>
  );
};
