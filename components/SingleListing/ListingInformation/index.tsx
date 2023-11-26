import { Database } from "@/types/supabase";

type Info = {
  checkFunc: () => boolean;
  title: string;
  emoji: string;
  trueValue: string | number;
  falseValue: string | number;
};

type NonNullableProperties<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

export const ListingInformation = ({
  data,
  numberFormatter,
}: {
  data: Database["public"]["Tables"]["listings"]["Row"][] | null;
  numberFormatter: Intl.NumberFormat;
}) => {
  const l = data?.[0] as NonNullableProperties<
    Database["public"]["Tables"]["listings"]["Row"]
  >;

  const info: Info[] = [
    {
      checkFunc: () => !!l.available_date,
      title: "Available Date",
      emoji: "📅",
      trueValue: l?.available_date,
      falseValue: "?",
    },
    {
      checkFunc: () => !!l.rent,
      title: "Rent",
      emoji: "💲",
      trueValue: numberFormatter.format(l?.rent),
      falseValue: "?",
    },
    {
      checkFunc: () => l.security_deposit === 0 || !!l.security_deposit,
      title: "Security Deposit",
      emoji: "💰",
      trueValue: numberFormatter.format(l?.security_deposit),
      falseValue: "?",
    },
    {
      checkFunc: () => l.bedrooms === 0 || !!l.bedrooms,
      title: "Bedrooms",
      emoji: "🛌",
      trueValue: l?.bedrooms,
      falseValue: "?",
    },
    {
      checkFunc: () => l.bathrooms === 0 || !!l.bathrooms,
      title: "Bathrooms",
      emoji: "🛁",
      trueValue: l?.bathrooms,
      falseValue: "?",
    },
    {
      checkFunc: () => l.application_fee === 0 || !!l.application_fee,
      title: "Application Fee",
      emoji: "💸",
      trueValue: l?.application_fee,
      falseValue: "?",
    },
    {
      checkFunc: () => !!l.square_feet,
      title: "Sq Ft",
      emoji: "📐",
      trueValue: l?.square_feet,
      falseValue: "?",
    },
    {
      checkFunc: () => !!l.cats_allowed,
      title: "Cats",
      emoji: "🐱",
      trueValue: "Yes",
      falseValue: "No",
    },
    {
      checkFunc: () => !!l.dogs_allowed,
      title: "Dogs",
      emoji: "🐶",
      trueValue: "Yes",
      falseValue: "No",
    },
    {
      checkFunc: () => !!l.building_type,
      title: "Home Type",
      emoji: "🏠",
      trueValue: l?.building_type,
      falseValue: "?",
    },
    {
      checkFunc: () => !!l.amenities,
      title: "Amenities",
      emoji: "🧺",
      trueValue: l?.amenities,
      falseValue: "Not specified",
    },
    {
      checkFunc: () => !!l.lease_length,
      title: "Lease length",
      emoji: "🗓",
      trueValue: l?.lease_length,
      falseValue: "Not specified",
    },
  ];
  return (
    <div className='w-full p-2'>
      {info.map((listing) => (
        <div
          key={listing.emoji}
          className='flex flex-row gap-5 text-lg justify-between border-b border-b-gray-400'
        >
          <h2 className='flex flex-row w-1/2'>
            <span className='w-1/4'>{listing.emoji}</span>
            <span className='text-start w-3/4'>{listing.title}</span>
          </h2>
          <span className='text-primary text-end'>
            {listing.checkFunc() ? (
              listing.trueValue
            ) : (
              <span className='text-red-500'>{listing.falseValue}</span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
};
