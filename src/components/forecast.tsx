import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import Image from "next/image";
import { ForecastProps } from "@/types/component-types";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast: React.FC<ForecastProps> = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  const current = new Date();
  let currentDate = current.toString().slice(0, 15);

  const forecastData = data?.list?.slice(0, 7) || [];

  return (
    <>
      <label className="text-[23px] font-700">Date: {currentDate}</label>
      <Accordion allowZeroExpanded>
        {forecastData.map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemButton>
              <div className="bg-gray-200 rounded-xl h-10 m-1 items-center cursor-pointer flex text-base px-5">
                <Image
                  src={{
                    src: `/icons/${item.weather[0]?.icon}.png`,
                    width: 100,
                    height: 100,
                  }}
                  className="w-[40px]"
                  alt={item.weather[0]?.description || "Weather icon"}
                />

                <label className="cursor-pointer text-gray-700 flex-1 font-semibold ml-4">
                  {forecastDays[idx]}
                </label>
                <label className="cursor-pointer flex-1 mr-4 text-right">
                  {item.weather[0]?.description ?? "No description available"}
                </label>
                <label className="text-gray-600">
                  {Math.round(item.main.temp_max)}°C /
                  {Math.round(item.main.temp_min)}°C
                </label>
              </div>
            </AccordionItemButton>
            <AccordionItemPanel>
              <div className="grid gap-x-4 grid-cols-2 py-1 px-4">
                <div className="items-center flex h-8 justify-between">
                  <label className="text-gray-600">Pressure:</label>
                  <label className="text-gray-800">{item.main.pressure}</label>
                </div>
                <div className="items-center flex h-8 justify-between">
                  <label className="text-gray-600">Humidity:</label>
                  <label className="text-gray-800">{item.main.humidity}</label>
                </div>
                <div className="items-center flex h-8 justify-between">
                  <label className="text-gray-600">Clouds:</label>
                  <label className="text-gray-800">{item.clouds.all}%</label>
                </div>
                <div className="items-center flex h-8 justify-between">
                  <label className="text-gray-600">Wind speed:</label>
                  <label className="text-gray-800">{item.wind.speed} m/s</label>
                </div>
                <div className="items-center flex h-8 justify-between">
                  <label className="text-gray-600">Sea level:</label>
                  <label className="text-gray-800">
                    {item.main.sea_level}m
                  </label>
                </div>
                <div className="items-center flex h-8 justify-between">
                  <label className="text-gray-600">Feels like:</label>
                  <label className="text-gray-800">
                    {item.main.feels_like}°C
                  </label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
