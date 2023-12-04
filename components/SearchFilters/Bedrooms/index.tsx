"use client";

import { Input } from "@/components/ui/input";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { AccordionWrapper } from "@/components/ui/accordionWrapper";
import { FiltersState } from "@/app/listings/parseSearchParams";

export const Bedrooms = ({
  setFilters,
  filters,
}: {
  setFilters: Dispatch<SetStateAction<FiltersState>>;
  filters: { min: number; max: number };
}) => {
  const [bedrooms, setBedrooms] = useState<{
    min: number;
    max: number;
  }>(filters);

  const updateBedrooms = (newValue: string | number, minMax: "min" | "max") => {
    if (isNaN(Number(newValue))) {
      setBedrooms((prev) => ({ ...prev, [minMax]: "" }));
      return;
    }
    setBedrooms((prev) => ({ ...prev, [minMax]: Number(newValue) }));
  };

  const onBlur = () => {
    if (bedrooms.min > bedrooms.max && bedrooms.max !== 0) {
      setBedrooms((prev) => ({ min: prev.max, max: prev.min }));
    }
  };

  useEffect(
    () => setFilters((prev) => ({ ...prev, bedrooms: bedrooms })),
    [bedrooms],
  );

  return (
    <AccordionWrapper
      className="pt-3 flex flex-row justify-evenly"
      triggerText="Bedrooms"
      value="bedrooms"
    >
      <div className="flex flex-row justify-center items-center gap-3">
        <Input
          type="text"
          className="w-1/4"
          name="minBedrooms"
          id="minBedrooms"
          value={bedrooms.min}
          onChange={(e) => updateBedrooms(e.target.value, "min")}
          onBlur={() => onBlur()}
          onFocus={(e) => e.target.select()}
        ></Input>
        <label htmlFor="minBedrooms">Min</label>
      </div>
      <div className="flex flex-row justify-center items-center gap-3">
        <Input
          type="text"
          className="w-1/4"
          name="maxBedrooms"
          id="maxBedrooms"
          value={bedrooms.max}
          onChange={(e) => updateBedrooms(e.target.value, "max")}
          onBlur={() => onBlur()}
          onFocus={(e) => e.target.select()}
        ></Input>
        <label htmlFor="maxBedrooms">Max</label>
      </div>
    </AccordionWrapper>
  );
};
