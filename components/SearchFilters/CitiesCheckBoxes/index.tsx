"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@radix-ui/react-label";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AccordionWrapper } from "@/components/ui/accordionWrapper";
import { FiltersState } from "@/app/listings/parseSearchParams";

export const CitiesCheckBoxes = ({
  filters,
  filterSetter,
}: {
  filters: FiltersState["cities"];
  filterSetter: Dispatch<SetStateAction<FiltersState>>;
}) => {
  const [selectedCities, setSelectedCities] = useState(filters);
  const [isAllSelected, setAllSelected] = useState(false);

  // TODO fix type of prev
  const updateAllCities = (bool: boolean) => {
    setAllSelected(bool);
    setSelectedCities((prev) => {
      return Object.keys(prev as {}).reduce((reducer, key) => {
        return { ...reducer, [key]: bool };
      }, {});
    });
  };

  const checkIfAllSelected = () => {
    if (!selectedCities) return false;
    return Object.keys(selectedCities).every((i) => selectedCities[i]);
  };

  useEffect(() => {
    const isAll = checkIfAllSelected();
    if (isAll) setAllSelected(true);
  }, []);

  useEffect(() => {
    if (checkIfAllSelected()) setAllSelected(true);
    if (!checkIfAllSelected()) setAllSelected(false);
    filterSetter((prev) => {
      return { ...prev, cities: selectedCities };
    });
  }, [selectedCities]);
  return (
    <AccordionWrapper
      className="flex flex-row flex-wrap gap-3"
      value="cities"
      triggerText="Cities"
    >
      <div className="flex flex-row gap-1">
        <Checkbox
          checked={isAllSelected}
          onCheckedChange={(boolish) => updateAllCities(!!boolish.valueOf())}
          name={`checkbox-selectAll`}
          id="checkbox-selectAll"
        ></Checkbox>
        <Label
          className="hover:cursor-pointer hover:text-primary"
          htmlFor={`checkbox-selectAll`}
        >
          <span className="text-primary">Select All</span>
        </Label>
      </div>
      {Object.keys(filters as {}).map((c, i) => (
        <div className="flex flex-row gap-1" key={c}>
          <Checkbox
            // @ts-ignore TODO fix this
            checked={selectedCities[c]}
            onCheckedChange={(boolish) =>
              setSelectedCities((prev) => {
                return {
                  ...prev,
                  [`${c}`]: !!boolish.valueOf(),
                };
              })
            }
            name={`checkbox-${i}`}
            id={`checkbox-${i}`}
          />
          <Label
            className="hover:cursor-pointer hover:text-primary"
            htmlFor={`checkbox-${i}`}
          >
            {c}
          </Label>
        </div>
      ))}
    </AccordionWrapper>
  );
};
