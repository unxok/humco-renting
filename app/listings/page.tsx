import { Listings } from "@/components/Listings";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";

const listings = ({
  searchParams,
}: {
  searchParams: { [key: string]: any };
}) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full p-10">All Listings</div>

      <Suspense fallback={<Loading w={50} h={50} />}>
        <Listings searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default listings;
