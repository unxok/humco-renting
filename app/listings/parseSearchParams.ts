export type FiltersState = {
  rent: number[];
  cities?: { [key: string]: boolean };
  bedrooms: { min: number; max: number };
  bathrooms: { min: number; max: number };
  pets: { dogs: boolean; cats: boolean };
};

export const parseSearchParams = (
  searchParams: { [key: string]: any },
  cities: { address_city: string | null }[] | null,
) => {
  const paramsState: FiltersState = {
    rent: [0, 15000],
    cities: cities?.reduce((reducer, c) => {
      return { ...reducer, [c.address_city as string]: true };
    }, {}),
    bedrooms: { min: 0, max: 10 },
    bathrooms: { min: 0, max: 10 },
    pets: { cats: false, dogs: false },
  };
  const params = new URLSearchParams(searchParams);
  if (params.get("rentMin") && params.get("rentMax")) {
    paramsState.rent = [
      Number(params.get("rentMin")),
      Number(params.get("rentMax")),
    ];
  }
  if (params.get("bedroomsMin") && params.get("bedroomsMax")) {
    paramsState.bedrooms = {
      min: Number(params.get("bedroomsMin")),
      max: Number(params.get("bedroomsMax")),
    };
  }
  if (params.get("bathroomsMin") && params.get("bathroomsMax")) {
    paramsState.bathrooms = {
      min: Number(params.get("bathroomsMin")),
      max: Number(params.get("bathroomsMax")),
    };
  }
  if (params.get("petsCats") && params.get("petsDogs")) {
    paramsState.pets = {
      cats: params.get("petsCats") === "false" ? false : true,
      dogs: params.get("petsDogs") === "false" ? false : true,
    };
  }
  paramsState.cities = Array.from(params).reduce(
    (reducer, arr) => {
      if (arr[0].includes("city")) {
        const bool = arr[1] === "false" ? false : true;
        return { ...reducer, [arr[0].slice(4)]: bool };
      }
      return reducer;
    },
    paramsState.cities as NonNullable<typeof paramsState.cities>,
  );

  return paramsState;
};
