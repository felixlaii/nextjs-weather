import React, { useState } from "react";
import Search from "@/components/search";
import CurrentWeather, { WeatherData } from "@/components/current-weather";
import Forecast, { ForecastDataItem } from "@/components/forecast";
import { SearchDataProps } from "@/types/component-types";
import { getWeatherData, getForecastData } from "./api/weather-api";


function App() {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
    null
  );
  const [forecast, setForecast] = useState<ForecastDataItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOnSearchChange = async (searchData: SearchDataProps) => {
    setIsLoading(true);
    setError(null);

    const [lat, lon] = searchData.value.split(" ");

    try {
      const [weatherData, forecastData] = await Promise.all([
        getWeatherData(lat, lon),
        getForecastData(lat, lon),
      ])

      setCurrentWeather({  ...weatherData });
      setForecast(forecastData);
    } catch (error: any) {
      // Handle the error
      if (error instanceof Error) {
        // Handle error as an instance of Error
        setError(error.message);
      } else {
        // Handle other types of errors or unknown types
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="my-20 mr-10 ml-10 mx-auto w-max-1080px">
      <Search onSearchChange={handleOnSearchChange} />
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={{ list: forecast }} />}
    </div>
  );
}

export default App;
