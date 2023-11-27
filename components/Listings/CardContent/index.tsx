import Image from "next/image";
import { Database } from "@/types/supabase";
import { Cat } from "@/app/resources/svg/Cat";
import { Dog } from "@/app/resources/svg/Dog";
import { Bed } from "@/app/resources/svg/Bed";
import { Bath } from "@/app/resources/svg/Bath";

type CardContentProps = {
  l: Database["public"]["Tables"]["listings"]["Row"];
  numberFormatter: Intl.NumberFormat;
};

export const CardContent = ({ l, numberFormatter }: CardContentProps) => (
  <div className="flex flex-col gap-1">
    <p className="text-sm">{l.description}</p>
    <div className="text-primary text-3xl font-extrabold flex flex-row items-center justify-center gap-3">
      {numberFormatter.format(l.rent as number)}
      <div className="flex flex-row items-center justify-center">
        {l.cats_allowed && <Cat fill="hsl(var(--foreground))" w={30} h={30} />}
        {l.dogs_allowed && <Dog fill="hsl(var(--foreground))" w={30} h={30} />}
      </div>
    </div>
    <div className="flex flex-row justify-center items-center gap-2">
      <p className="flex flex-row justify-center items-center gap-2">
        {l.bedrooms}
        <Bed fill="hsl(var(--foreground))" w={30} h={30} />
      </p>
      <p className="flex flex-row justify-center items-center gap-2">
        {l.bathrooms}
        {/* <Image src={Bath} alt="Bathrooms" width={30} height={30} /> */}
        <Bath fill="hsl(var(--foreground))" w={30} h={30}></Bath>
      </p>
    </div>
    <div>
      Available &nbsp;
      {new Date(l.available_date as string).toLocaleDateString()}
    </div>
  </div>
);
