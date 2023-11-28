"use client";

import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
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
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import { RentSlider } from "./RentSlider";
import { useEffect, useState } from "react";
import { CitiesCheckBoxes } from "./CitiesCheckBoxes";

type FilterSearchParams = {
  city: string; // query all unique cities from listings
  bedrooms: number;
  bathrooms: number;
  cats: boolean;
  dogs: boolean;
  square_feet: number;
  security_deposit: number;
  application_fee: number;
  available_date: string; // really a Date though
  building_type: string; // query all unique building_type from listings
};

export type Filters = {
  rentSlider: number[];
  citiesCheckBoxes?: { [key: string]: boolean };
};

export const SearchFilters = ({
  cities,
}: {
  cities:
    | {
        address_city: string | null;
      }[]
    | null;
}) => {
  const [filters, setFilters] = useState<Filters>({
    rentSlider: [0, 15000],
    citiesCheckBoxes: cities?.reduce((reducer, c) => {
      return { ...reducer, [c.address_city as string]: true };
    }, {}),
  });

  useEffect(
    () => console.log("filter from search filters", filters),
    [filters],
  );

  return (
    <Accordion className="w-full p-1 border" type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Seach Filters</AccordionTrigger>
        <AccordionContent>
          <Card>
            {/* <CardHeader>
              <CardTitle>Search Filters</CardTitle>
              <CardDescription>
                Here you can narrow down your search to your perfect home!
              </CardDescription>
            </CardHeader> */}
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-0">
                  <AccordionTrigger>Rent</AccordionTrigger>
                  <AccordionContent className="flex flex-row pt-3">
                    <RentSlider
                      filters={filters.rentSlider}
                      filterSetter={setFilters}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Cities</AccordionTrigger>
                  <AccordionContent className="flex flex-row flex-wrap gap-3">
                    <CitiesCheckBoxes
                      filters={filters.citiesCheckBoxes}
                      filterSetter={setFilters}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Bedrooms & Bathrooms</AccordionTrigger>
                  <AccordionContent className="pt-3 flex flex-row justify-evenly">
                    <div className="flex flex-row justify-center items-center gap-3">
                      <Input className="w-1/4" name="bedroomsInput"></Input>
                      <label htmlFor="bedroomsInput">Bedrooms</label>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-3">
                      <Input className="w-1/4" name="bathroomsInput"></Input>
                      <label htmlFor="bathroomsInput">Bathrooms</label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Pets</AccordionTrigger>
                  <AccordionContent className="pt-3 flex flex-row justify-evenly">
                    <div className="flex flex-row justify-center items-center gap-3">
                      <Checkbox name="catsInput" />
                      <label htmlFor="catsInput">Cats</label>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-3">
                      <Checkbox name="dogsInput" />
                      <label htmlFor="dogsInput">Dogs</label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>

            {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
