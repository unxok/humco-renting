"use client";

import { Input } from "@/components/ui/input";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { AccordionWrapper } from "@/components/ui/accordionWrapper";
import { FiltersState } from "@/app/listings/parseSearchParams";

export const Bathrooms = ({
  setFilters,
  filters,
}: {
  setFilters: Dispatch<SetStateAction<FiltersState>>;
  filters: { min: number; max: number };
}) => {
  const [bathrooms, setBathrooms] = useState<{
    min: number;
    max: number;
  }>(filters);

  const updateBedrooms = (newValue: string | number, minMax: "min" | "max") => {
    if (isNaN(Number(newValue))) {
      setBathrooms((prev) => ({ ...prev, [minMax]: "" }));
      return;
    }
    setBathrooms((prev) => ({ ...prev, [minMax]: Number(newValue) }));
  };

  const onBlur = () => {
    if (bathrooms.min > bathrooms.max && bathrooms.max !== 0) {
      console.log("made it");
      setBathrooms((prev) => ({ min: prev.max, max: prev.min }));
    }
  };

  useEffect(
    () => setFilters((prev) => ({ ...prev, bathrooms: bathrooms })),
    [bathrooms],
  );

  return (
    <AccordionWrapper
      className="pt-3 flex flex-row justify-evenly"
      triggerText="Bathrooms"
      value="bathrooms"
    >
      <div className="flex flex-row justify-center items-center gap-3">
        <Input
          type="text"
          className="w-1/4"
          name="minBathrooms"
          id="minBathrooms"
          value={bathrooms.min}
          onChange={(e) => updateBedrooms(e.target.value, "min")}
          onBlur={() => onBlur()}
          onFocus={(e) => e.target.select()}
        ></Input>
        <label htmlFor="minBathrooms">Min</label>
      </div>
      <div className="flex flex-row justify-center items-center gap-3">
        <Input
          type="text"
          className="w-1/4"
          name="maxBathrooms"
          id="maxBathrooms"
          value={bathrooms.max}
          onChange={(e) => updateBedrooms(e.target.value, "max")}
          onBlur={() => onBlur()}
          onFocus={(e) => e.target.select()}
        ></Input>
        <label htmlFor="maxBathrooms">Max</label>
      </div>
    </AccordionWrapper>
  );
};
