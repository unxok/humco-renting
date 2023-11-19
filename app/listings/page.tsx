import { Listings } from "@/components/Listings";
import { Suspense } from "react";

const listings = () => {
  return (
    <div className='flex flex-row justify-center items-center'>
      <Suspense>
        <Listings />
      </Suspense>
    </div>
  );
};

export default listings;
