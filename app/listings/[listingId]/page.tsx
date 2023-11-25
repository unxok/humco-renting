import { SingleListing } from "@/components/SingleListing";

type ListingParams = {
  params: {
    listingId: number;
  };
};

const ListingPage = ({ params: { listingId } }: ListingParams) => {
  return <SingleListing listingId={listingId} />;
};

export default ListingPage;
