import React, { useState } from "react";
import { SearchDataProps } from "@/types/component-types";
import { AsyncPaginate } from "react-select-async-paginate";

const Search: React.FC<SearchDataProps> = ({ onSearchChange }) => {
  const [search, setSearch] = useState<null | SearchDataProps>(null);

  const loadOptions = (inputValue: SearchDataProps) => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/cities?minPopulation=1000000&namePrefix=${inputValue}`
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city: SearchDataProps) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };

  const handleOnChange = (searchData: SearchDataProps) => {
    if (setSearch) {
      setSearch(searchData);
    }

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
