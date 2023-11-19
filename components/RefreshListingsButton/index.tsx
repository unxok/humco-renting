import getListings from "@/app/actions/getListings";
import { Button } from "../ui/button";

export const RefreshListingsButton = () => {
  return (
    <form action={getListings}>
      <Button variant={"destructive"} type={"submit"}>
        Refresh Listings
      </Button>
    </form>
  );
};
