import sbServer from "@/utils/supabase/SupabaseClients/sbServer";
import Image from "next/image";

export const SingleListing = async ({ listingId }: { listingId: number }) => {
  const db = await sbServer();
  const { data, error } = await db
    .from("listings")
    .select("*")
    .eq("id", listingId);
  console.log("queried data", data);
  console.log("any errors?", error);

  return (
    <div className='bg-slate-400 w-[100vw] flex flex-col justify-center items-center'>
      I am a listing! {listingId}
      <div className=''>
        {data?.[0].picture_urls?.map((url, i) => (
          <Image
            key={i}
            src={url}
            alt={`picture number ${i}`}
            width={300}
            height={300}
          />
        ))}
      </div>
    </div>
  );
};
