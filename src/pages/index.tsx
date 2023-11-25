import React, { useState, useEffect } from "react";
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

  const fetchData = async (searchData?: SearchDataProps) => {
    setIsLoading(true);
    setError(null);

    try {
      const coordinates = searchData?.value
        ? searchData.value.split(" ")
        : ["0", "0"];
      const [lat, lon] = coordinates;

      const currentWeatherResponse = await fetch(
        `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric`
      );
      const forecastResponse = await fetch(
        `${FORECAST_API_URL}?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric`
      );

      const weatherData: WeatherData = {
        city: searchData?.label || "Unknown City",
        ...(await currentWeatherResponse.json()),
      };

      const forecastData: ForecastDataItem[] | null = (
        await forecastResponse.json()
      ).list;

      setCurrentWeather(weatherData);
      setForecast(forecastData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOnSearchChange = (searchData: SearchDataProps) => {
    fetchData(searchData);
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
