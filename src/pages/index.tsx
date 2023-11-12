import React, { useState } from "react";
import Search from "@/components/search";
import CurrentWeather, { WeatherData } from "@/components/current-weather";
import Forecast, { ForecastDataItem } from "@/components/forecast";
import { SearchDataProps } from "@/types/component-types";

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_API_URL = "https://api.openweathermap.org/data/2.5/forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
    null
  );
  const [forecast, setForecast] = useState<ForecastDataItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOnSearchChange = (searchData: SearchDataProps) => {
    setIsLoading(true);
    setError(null);

    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${FORECAST_API_URL}?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (responses) => {
        const [weatherResponse, forecastResponse] = await Promise.all(
          responses.map((response) => response.json())
        );

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast(forecastResponse.list || null);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
