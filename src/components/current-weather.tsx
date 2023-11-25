import React from "react";
import Image from "next/image";
import { CurrentWeatherProps } from "@/types/component-types";

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  if (!data || !data.city || !data.weather || !data.weather[0]) {
    return <div>Error: Invalid data</div>;
  }
  return (
    <div className="w-1/3 border-6 rounded-lg shadow-xl text-white bg-gray-600 mx-auto mt-20 mb-0 p-0 sm:p-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold text-18 leading-1 m-0 tracking-wider">
            {data.city}
          </p>
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
      <div className="flex justify-between items-center">
        <p className="font-bold text-70 tracking-wide mb-10">
          {Math.round(data.main.temp)}°C
        </p>
        <div className="w-full pl-20">
          <div className="flex justify-between">
            <span className="text-left">Details</span>
          </div>
          <div className="flex justify-between">
            <span className="text-left text-[12px]">Feels like</span>
            <span className="text-right text-[12px]">
              {Math.round(data.main.feels_like)}°C
            </span>
          </div>
          <div className="flex justify-between">
            <span className="border-b border-white text-left font-400 text-[12px]">
              Wind
            </span>
            <span className="text-right font-600 text-[12px]">
              {data.wind.speed} m/s
            </span>
          </div>
          <div className="flex justify-between">
            <span className="border-b border-white text-left font-400 text-[12px]">
              Humidity
            </span>
            <span className="text-right font-600 text-[12px]">
              {data.main.humidity}%
            </span>
          </div>
          <div className="flex justify-between">
            <span className="border-b border-white text-left font-400 text-[12px]">
              Pressure
            </span>
            <span className="text-right font-600 text-[12px]">
              {data.main.pressure} hPa
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
