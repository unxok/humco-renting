"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@radix-ui/react-label";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Filters } from "..";

export const CitiesCheckBoxes = ({
  filters,
  filterSetter,
}: {
  filters: Filters["citiesCheckBoxes"];
  filterSetter: Dispatch<SetStateAction<Filters>>;
}) => {
  const [selectedCities, setSelectedCities] = useState(filters);

  useEffect(() => {
    console.log(selectedCities);
    filterSetter((prev) => {
      return { ...prev, citiesCheckBoxes: selectedCities };
    });
  }, [selectedCities]);
  return Object.keys(filters as {}).map((c, i) => (
    <div className="flex flex-row gap-1" key={c}>
      <Checkbox
        //@ts-expect-error TODO fix this
        checked={selectedCities[c]}
        onCheckedChange={(bool) =>
          setSelectedCities((prev) => {
            return {
              ...prev,
              [`${c}`]: !!bool.valueOf(),
            };
          })
        }
        name={`checkbox-${i}`}
      />
      <Label htmlFor={`checkbox-${i}`}>{c}</Label>
    </div>
  ));
};
