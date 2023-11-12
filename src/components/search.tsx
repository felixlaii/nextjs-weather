import React, { useState } from "react";
import { SearchDataProps } from "@/types/component-types";
import { AsyncPaginate } from "react-select-async-paginate";
import { ActionMeta, SingleValue } from "react-select";
import { SearchProps } from "@/types/component-types";

const Search: React.FC<SearchProps> = ({ onSearchChange }) => {
  const [search, setSearch] = useState<null | SearchDataProps>(null);

  const loadOptions = (inputValue: string) => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: [
            {
              value: `${response.coord.lat} ${response.coord.lon}`,
              label: `${response.name}, ${response.sys.country}`,
              inputValue: "",
              city: response.name,
              latitude: String(response.coord.lat),
              longitude: String(response.coord.lon),
              countryCode: response.sys.country,
              name: response.name,
              searchData: "", 
            },
          ],
        };
      });
  };

  const handleOnChange = (
    selectedOption: SingleValue<SearchDataProps>,
    actionMeta: ActionMeta<SearchDataProps>
  ) => {
    const searchData: SearchDataProps | null = selectedOption
      ? {
          value: selectedOption.value,
          label: selectedOption.label,
          inputValue: "",
          city: "",
          latitude: "",
          longitude: "",
          countryCode: "",
          name: "",
          searchData: "",
        }
      : {
          value: "", 
          label: "",
          inputValue: "",
          city: "",
          latitude: "",
          longitude: "",
          countryCode: "",
          name: "",
          searchData: "",
        };

    setSearch(searchData);

    if (onSearchChange) {
      onSearchChange(searchData);
    }
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
