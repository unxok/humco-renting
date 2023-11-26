import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

import { RefreshListingsButton } from "@/components/RefreshListingsButton";

export const dynamic = "force-dynamic";

export default async function Index() {
  return (
    <div className='fixed inset-20 flex justify-center items-center flex-col gap-5'>
      <RefreshListingsButton />
      <div>
        <Link
          href={"/listings"}
          className={buttonVariants({ variant: "default" })}
        >
          Go to Listings
        </Link>
      </div>
    </div>
  );
}
