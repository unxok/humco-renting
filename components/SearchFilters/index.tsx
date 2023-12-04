"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RentSlider } from "./RentSlider";
import { useState } from "react";
import { CitiesCheckBoxes } from "./CitiesCheckBoxes";
import { Bedrooms } from "./Bedrooms";
import { Pets } from "./Pets";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Bathrooms } from "./Bathrooms";
import { reloadWithSearchParams } from "./reloadWithSearchParams";
import { FiltersState } from "@/app/listings/parseSearchParams";

type SearchFiltersProps = {
  initialState: FiltersState;
};

export const SearchFilters = ({ initialState }: SearchFiltersProps) => {
  const [filters, setFilters] = useState(initialState);

  const router = useRouter();

  return (
    <Accordion className="w-full p-1 border" type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Seach Filters</AccordionTrigger>
        <AccordionContent>
          <Card>
            <CardHeader>
              <CardTitle>Search Filters</CardTitle>
              <CardDescription className="flex flex-col gap-3">
                <span>Narrow down your search to your perfect home!</span>
                <span>
                  Not seeing an option you want?
                  {/* TODO set up this link */}
                  <Link className="text-primary" href="/">
                    &nbsp;Let us know
                  </Link>
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RentSlider filters={filters.rent} filterSetter={setFilters} />
              <CitiesCheckBoxes
                filters={filters.cities}
                filterSetter={setFilters}
              />
              <Bedrooms setFilters={setFilters} filters={filters.bedrooms} />
              <Bathrooms setFilters={setFilters} filters={filters.bathrooms} />
              <Pets filters={filters.pets} setFilters={setFilters} />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                onClick={() => (window.location.href = "/listings")}
                variant="destructive"
              >
                Reset
              </Button>
              <Button
                onClick={() => {
                  const queryParamString = reloadWithSearchParams(filters);
                  router.push(`/listings?${queryParamString}`);
                }}
              >
                Apply
              </Button>
            </CardFooter>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
