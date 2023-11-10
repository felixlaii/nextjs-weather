import React, { useState } from "react";
import { SearchDataProps } from "@/types/component-types";

const Search: React.FC<SearchDataProps> = ({onSearchChange, }) => {
    const [search, setSearch] = useState(null);

    const loadOptions = (inputValue: SearchDataProps) => {
        return fetch(
          `https://api.openweathermap.org/data/2.5/cities?minPopulation=1000000&namePrefix=${inputValue}`,
    
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
    

    return (
        <div>

        </div>
    )
}