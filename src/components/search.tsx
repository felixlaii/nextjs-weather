import React, { useState } from "react";
import { SearchDataProps } from "@/types/component-types";
import { AsyncPaginate } from "react-select-async-paginate";
import { ActionMeta, SingleValue } from "react-select";

const Search: React.FC<SearchDataProps> = ({ onSearchChange }) => {
  const [search, setSearch] = useState<null | SearchDataProps>(null);

  const loadOptions = (inputValue: string) => {
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
          value: "",  // Provide default values if selectedOption is null
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
