import { Listings } from "@/components/Listings";
import { Suspense } from "react";

const listings = ({
  searchParams,
}: {
  searchParams: { [key: string]: any };
}) => {
  return (
    <div className='flex flex-row justify-center items-center'>
      <Suspense>
        <Listings searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default listings;
