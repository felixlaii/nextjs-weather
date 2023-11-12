import React from "react";
import Image from "next/image";

export interface WeatherData {
    city: string;
    weather: {
      description: string;
      icon: string;
    }[];
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
      pressure: number;
    };
    wind: {
      speed: number;
    };
  }
  
  interface CurrentWeatherProps {
    data: WeatherData;
  }
  
  const parameterRow = "flex justify-between";
  const parameterLabel = "text-left font-400 text-[12px]"
  const parameterValue = "text-right font-600 text-[12px]"
  const weather = "w-[300px] rounded-md shadow-lg text-white bg-darkgrey pt-0 pr-20 pb-20 pl-20 m-20 mx-auto mt-0"
  const top = "flex justify-between items-center"
  const city = "font-600 text-[18px] m-0 tracking-wide"
  const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
    if (!data || !data.city || !data.weather || !data.weather[0]) {
      return <div>Error: Invalid data</div>;
    }
    return (
      <div className={weather}>
        <div className={top}>
          <div>
            <p className={city}>{data.city}</p>
            <p className="text-md">{data.weather[0].description}</p>
          </div>
          <Image
            alt="weather"
            width={100}
            height={100}
            className="w-[100px]"
            src={`/icons/${data.weather[0].icon}.png`}
          />
        </div>
        <div className={parameterRow}>
          <p className="w-auto">{Math.round(data.main.temp)}°C</p>
          <div className="w-full pl-[20px]">
            <div className={parameterRow}>
              <span className="text-left">Details</span>
            </div>
            <div className={parameterRow}>
              <span className="text-left text-[12px]">Feels like</span>
              <span className="text-right text-[12px]">
                {Math.round(data.main.feels_like)}°C
              </span>
            </div>
            <div className={parameterRow}>
              <span className={parameterLabel}>Wind</span>
              <span className={parameterValue}>{data.wind.speed} m/s</span>
            </div>
            <div className={parameterRow}>
              <span className={parameterLabel}>Humidity</span>
              <span className={parameterValue}>{data.main.humidity}%</span>
            </div>
            <div className={parameterRow}>
              <span className={parameterLabel}>Pressure</span>
              <span className={parameterValue}>{data.main.pressure} hPa</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default CurrentWeather;