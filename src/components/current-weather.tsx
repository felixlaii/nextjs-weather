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
  
const CurrentWeather: React.FC<CurrentWeatherProps> = ({data}) => {
    if (!data || !data.city || !data.weather || !data.weather[0]) {
        return <div>Error: Invalid data</div>;
      }
    return (
<div className="w-[300px] rounded-lg shadow-xl bg-white">
      <div className="flex justify-between items-center">
        <div>
          <p className="tracking-wide">{data.city}</p>
          <p className="text-md">{data.weather[0].description}</p>
        </div>
        <Image
          alt="weather"
          width={100}
          height={100}
          className="w-[100px]"
          src={`/icons/${data.weather[0].icon}.png` }
          
        />
      </div>
      <div className="flex justify-between items-center">
        <p className="w-auto">{Math.round(data.main.temp)}°C</p>
        <div className="w-full pl-[20px]">
          <div className="flex justify-between">
            <span className="text-left">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">
              {Math.round(data.main.feels_like)}°C
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{data.wind.speed} m/s</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{data.main.humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
    )
}

export default CurrentWeather;