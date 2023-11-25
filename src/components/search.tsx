import React, { useState, useEffect } from "react";
import { SearchDataProps } from "@/types/component-types";

const Search: React.FC<{
  onSearchChange: (data: SearchDataProps | null) => void;
}> = ({ onSearchChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<SearchDataProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SearchDataProps | null>(
    null
  );

  const loadOptions = async (inputValue: string) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
      );

      if (response.ok) {
        const data = await response.json();
        const newOptions: SearchDataProps[] = [
          {
            value: `${data.coord.lat} ${data.coord.lon}`,
            label: `${data.name}, ${data.sys.country}`,
            inputValue: "",
            city: data.name,
            latitude: String(data.coord.lat),
            longitude: String(data.coord.lon),
            countryCode: data.sys.country,
            name: data.name,
            searchData: "",
          },
        ];

        setOptions(newOptions);
      } else {
        setOptions([]);
      }
    } catch (error) {
      console.error("Error fetching options:", error);
      setOptions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    loadOptions(value);
  };

  const handleOnChange = (selectedOption: SearchDataProps | null) => {
    setSelectedOption(selectedOption);

    if (onSearchChange) {
      onSearchChange(selectedOption);
    }
  };

  useEffect(() => {
    if (!inputValue) {
      setOptions([]);
    }
  }, [inputValue]);

  return (
    <div>
      <input
        className="w-full px-1 pt-2 pb-2 rounded-lg"
        type="text"
        placeholder="Search for city"
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
      />
      {isLoading && <p>Loading...</p>}
      <ul>
        {options.map((option) => (
          <li
            className="px-1"
            key={option.value}
            onClick={() => handleOnChange(option)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
