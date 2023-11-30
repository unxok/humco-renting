"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Filters } from "..";

export const RentSlider = ({
  filterSetter,
  filters,
}: {
  filterSetter: Dispatch<SetStateAction<Filters>>;
  filters?: any;
}) => {
  const [sliderValue, setSliderValue] = useState<number[]>(
    filters ? filters : [0, 15000],
  );
  useEffect(
    () => filterSetter((prev) => ({ ...prev, rentSlider: sliderValue })),
    [sliderValue],
  );

  return (
    <div className="flex flex-col gap-3">
      <Slider
        range={true}
        max={15000}
        step={1}
        minStepsBetweenThumbs={1}
        value={sliderValue}
        onValueChange={(newVal) => {
          setSliderValue(newVal);
        }}
      />
      <div className="flex flex-row justify-evenly">
        <div className="flex flex-row justify-center items-center gap-3">
          <Input
            onChange={(e) => {
              setSliderValue((prev) => [Number(e.target.value), prev[1]]);
            }}
            onBlur={(e) => {
              if (Number(e.target.value) > sliderValue[1]) {
                setSliderValue((prev) => [prev[1], Number(e.target.value)]);
              }
            }}
            value={sliderValue[0]}
            className="w-1/2"
            name="minRent"
            type="number"
          ></Input>
          <Label htmlFor="minRent">Min</Label>
        </div>
        <div className="flex flex-row justify-center items-center gap-3">
          <Input
            onChange={(e) => {
              setSliderValue((prev) => [prev[0], Number(e.target.value)]);
            }}
            onBlur={(e) => {
              if (Number(e.target.value) < sliderValue[0]) {
                setSliderValue((prev) => [Number(e.target.value), prev[0]]);
              }
            }}
            value={sliderValue[1]}
            className="w-1/2"
            name="maxRent"
            type="number"
          ></Input>
          <Label htmlFor="maxRent">Max</Label>
        </div>
      </div>
    </div>
  );
};
