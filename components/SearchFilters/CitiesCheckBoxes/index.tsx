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
      return { ...prev, citiesCheckBoxes: selectedCities };
    });
  }, [selectedCities]);
  return (
    <>
      <div className="flex flex-row gap-1">
        <Checkbox
          checked={isAllSelected}
          onCheckedChange={(bool) => updateAllCities(!!bool.valueOf())}
          name={`checkbox-selectAll`}
        >
          <Label htmlFor={`checkbox-selectAll`}>Select All</Label>
        </Checkbox>
      </div>
      {Object.keys(filters as {}).map((c, i) => (
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
      ))}
    </>
  );
};
