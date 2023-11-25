import Image from "next/image";
import { Database } from "@/types/supabase";
import Cat from "@/app/resources/svg/Cat.svg";
import Dog from "@/app/resources/svg/Dog.svg";
import Bed from "@/app/resources/svg/Bed.svg";
import Bath from "@/app/resources/svg/Bath.svg";

type CardContentProps = {
  l: Database["public"]["Tables"]["listings"]["Row"];
  numberFormatter: Intl.NumberFormat;
};

export const CardContent = ({ l, numberFormatter }: CardContentProps) => (
  <div className='flex flex-col gap-1'>
    <p className='text-sm'>{l.description}</p>
    <div className='text-primary text-3xl font-extrabold flex flex-row items-center justify-center gap-3'>
      {numberFormatter.format(l.rent as number)}
      <div className='flex flex-row items-center justify-center'>
        {l.cats_allowed && (
          <Image src={Cat} alt='Cats allowed' width={30} height={30} />
        )}
        {l.dogs_allowed && (
          <Image src={Dog} alt='Dogs allowed' width={30} height={30} />
        )}
      </div>
    </div>
    <div className='flex flex-row justify-center items-center gap-2'>
      <p className='flex flex-row justify-center items-center gap-2'>
        {l.bedrooms}
        <Image src={Bed} alt='Bedrooms' width={30} height={30} />
      </p>
      <p className='flex flex-row justify-center items-center gap-2'>
        {l.bathrooms}
        <Image src={Bath} alt='Bathrooms' width={30} height={30} />
      </p>
    </div>
    <div>
      Available &nbsp;
      {new Date(l.available_date as string).toLocaleDateString()}
    </div>
  </div>
);
