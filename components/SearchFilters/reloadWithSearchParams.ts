import { FiltersState } from "@/app/listings/parseSearchParams";

export const reloadWithSearchParams = (filters: FiltersState) => {
  const rentParam = `rentMin=${filters.rent[0]}&rentMax=${filters.rent[1]}`;
  const citiesKeys = Object.keys(
    filters.cities as NonNullable<FiltersState["cities"]>,
  );
  const citiesParam = citiesKeys.reduce((reducer, current, i) => {
    return (reducer += `${i > 0 ? "&" : ""}city${current}=${filters?.cities?.[
      current
    ]}`);
  }, "");
  const bedroomsParam = `bedroomsMin=${filters.bedrooms.min}&bedroomsMax=${filters.bedrooms.max}`;
  const bathroomsParam = `bathroomsMin=${filters.bathrooms.min}&bathroomsMax=${filters.bathrooms.max}`;
  const petsParam = `petsCats=${filters.pets.cats}&petsDogs=${filters.pets.dogs}`;
  const paramList = [
    rentParam,
    citiesParam,
    bedroomsParam,
    bathroomsParam,
    petsParam,
  ];
  return paramList.join("&");
};
