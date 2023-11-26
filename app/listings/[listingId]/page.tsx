import { SingleListing } from "@/components/SingleListing";

type ListingParams = {
  params: {
    listingId: number;
  };
  searchParams: { [key: string]: any };
};

const ListingPage = ({
  params: { listingId },
  searchParams,
}: ListingParams) => {
  return <SingleListing searchParams={searchParams} listingId={listingId} />;
};

export default ListingPage;
