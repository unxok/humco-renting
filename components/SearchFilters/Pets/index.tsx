"use client";

import { AccordionWrapper } from "@/components/ui/accordionWrapper";
import { Checkbox } from "@/components/ui/checkbox";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FiltersState } from "@/app/listings/parseSearchParams";

export const Pets = ({
  filters,
  setFilters,
}: {
  filters: FiltersState["pets"];
  setFilters: Dispatch<SetStateAction<FiltersState>>;
}) => {
  const [pets, setPets] = useState(filters);

  useEffect(() => setFilters((prev) => ({ ...prev, pets: pets })), [pets]);

  return (
    <AccordionWrapper
      className="pt-3 flex flex-col gap-3"
      triggerText="Pets"
      value="pets"
    >
      <h2>
        Leaving unchecked means you will see listings that both do and don't
        allow them.
      </h2>
      <div className="flex flex-row justify-evenly">
        <div className="flex flex-row justify-center items-center gap-3">
          <Checkbox
            id="catsInput"
            name="catsInput"
            checked={pets.cats}
            onCheckedChange={(boolish) =>
              setPets((prev) => ({ ...prev, cats: !!boolish.valueOf() }))
            }
          />
          <label htmlFor="catsInput">Cats</label>
        </div>
        <div className="flex flex-row justify-center items-center gap-3">
          <Checkbox
            id="dogsInput"
            name="dogsInput"
            checked={pets.dogs}
            onCheckedChange={(boolish) =>
              setPets((prev) => ({ ...prev, dogs: !!boolish.valueOf() }))
            }
          />
          <label htmlFor="dogsInput">Dogs</label>
        </div>
      </div>
    </AccordionWrapper>
  );
};
