import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import Image from "next/image";

const WEEK_DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];


  export interface ForecastDataItem {
    city: string;
    weather: {
      icon: string;
      description: string;
    }[];
    main: {
      temp_max: number;
      temp_min: number;
      pressure: number;
      humidity: number;
      sea_level: number;
      feels_like: number;
    };
    wind: {
      speed: number;
    };
    clouds: {
      all: number;
    };
  }
  
  export interface ForecastProps {
    data: {
      list: ForecastDataItem[];
    };
  }


  const Forecast: React.FC<ForecastProps> = ({ data }) => {
    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
      WEEK_DAYS.slice(0, dayInAWeek)
    );
  
    const current = new Date();
    let currentDate = current.toString().slice(0, 15);
  
    // Ensure that data and data.list are not null or undefined
    const forecastData = data?.list?.slice(0, 7) || [];
  
    const title = "text-[23px] font-700"
    const dailyItem = "bg-gray-200 rounded-lg h-10 m-1 items-center cursor-pointer flex text-base px-5"
    const iconSmall = "w-[40px]"
    const dailyItemDay = "cursor-pointer text-gray-700 flex-1 font-semibold ml-4"
    const weatherDescription = "cursor-pointer flex-1 mr-4 text-right"
    const dailyDetailsGrid = "grid gap-x-4 grid-cols-2 py-1 px-4"
    const dailyDetailsGridItem = "items-center flex h-8 justify-between"
    return (
      <>
        <label className={title}>Date: {currentDate}</label>
        <Accordion allowZeroExpanded>
          {forecastData.map((item, idx) => (
            <AccordionItem key={idx}>
              <AccordionItemButton>
                <div className={dailyItem}>
                  <Image
                    src={{ src: `/icons/${item.weather[0]?.icon}.png`, width: 100, height: 100 }}
                    className={iconSmall}
                    alt={item.weather[0]?.description || "Weather icon"}
                  />
  
                  <label className={dailyItemDay}>{forecastDays[idx]}</label>
                  <label className={weatherDescription}>
                    {item.weather[0]?.description ??
                      "No description available"}
                  </label>
                  <label className="text-gray-600">
                    {Math.round(item.main.temp_max)}°C /
                    {Math.round(item.main.temp_min)}°C
                  </label>
                </div>
              </AccordionItemButton>
              <AccordionItemPanel>
                <div className={dailyDetailsGrid}>
                <div className={dailyDetailsGridItem}>                    
                <label className="text-gray-600">Pressure:</label>
                    <label className="text-gray-800">{item.main.pressure}</label>
                  </div>
                  <div className={dailyDetailsGridItem}>
                    <label className="text-gray-600">Humidity:</label>
                    <label className="text-gray-800">{item.main.humidity}</label>
                  </div>
                  <div className={dailyDetailsGridItem}>
                    <label className="text-gray-600">Clouds:</label>
                    <label className="text-gray-800">{item.clouds.all}%</label>
                  </div>
                  <div className={dailyDetailsGridItem}>
                    <label className="text-gray-600">Wind speed:</label>
                    <label className="text-gray-800">{item.wind.speed} m/s</label>
                  </div>
                  <div className={dailyDetailsGridItem}>
                    <label className="text-gray-600">Sea level:</label>
                    <label className="text-gray-800">{item.main.sea_level}m</label>
                  </div>
                  <div className={dailyDetailsGridItem}>
                    <label className="text-gray-600">Feels like:</label>
                    <label className="text-gray-800">{item.main.feels_like}°C</label>
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