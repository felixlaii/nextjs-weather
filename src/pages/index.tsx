import { useState } from "react";
import { SearchDataProps } from "@/types/component-types";
import Search from "@/components/search";
import Forecast from "@/components/forecast";

const Home: React.FC<{ onSearchChange: (searchData: SearchDataProps) => void}> = ({
  onSearchChange,
}) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const searchData: SearchDataProps = {
    value: "someValue",
    label: "someLabel",
    inputValue: "someInputValue",
    city: "someCity",
    latitude: "someLatitude",
    longitude: "someLongitude",
    countryCode: "someCountryCode",
    name: "someName",
    searchData: "someSearchData",
  };

  const handleOnSearchChange = (searchData: SearchDataProps) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
    );
    const forecastFetch = fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (responses) => {
        const [currentWeatherResponse, forecastResponse] = await Promise.all(
          responses.map((response) => response.json())
        );

        setCurrentWeather({
          city: searchData.label,
          ...currentWeatherResponse,
        });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <div>
   <Search
        value="someValue"
        label="someLabel"
        inputValue="someInputValue"
        city="someCity"
        latitude="someLatitude"
        longitude="someLongitude"
        countryCode="someCountryCode"
        name="someName"
        searchData="someSearchData"
        onSearchChange={handleOnSearchChange}
      />      {/* <Search onSearchChange={handleOnSearchChange} /> */}
      {/* {currentWeather && <CurrentWeather data={currentWeather} />} */}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
};

export default Home;
