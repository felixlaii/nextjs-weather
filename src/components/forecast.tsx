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
  
    return (
      <>
        <label className="title">Date: {currentDate}</label>
        <Accordion allowZeroExpanded>
          {forecastData.map((item, idx) => (
            <AccordionItem key={idx}>
              <AccordionItemButton>
                <div className="daily-item">
                  <Image
                    src={{ src: `/icons/${item.weather[0]?.icon}.png`, width: 100, height: 100 }}
                    className="icon-small"
                    alt={item.weather[0]?.description || "Weather icon"}
                  />
  
                  <label className="day">{forecastDays[idx]}</label>
                  <label className="description">
                    {item.weather[0]?.description ??
                      "No description available"}
                  </label>
                  <label className="min-max">
                    {Math.round(item.main.temp_max)}°C /
                    {Math.round(item.main.temp_min)}°C
                  </label>
                </div>
              </AccordionItemButton>
              <AccordionItemPanel>
                <div className="daily-details-grid">
                  <div className="daily-details-grid-item">
                    <label>Pressure:</label>
                    <label>{item.main.pressure}</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Humidity:</label>
                    <label>{item.main.humidity}</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Clouds:</label>
                    <label>{item.clouds.all}%</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Wind speed:</label>
                    <label>{item.wind.speed} m/s</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Sea level:</label>
                    <label>{item.main.sea_level}m</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Feels like:</label>
                    <label>{item.main.feels_like}°C</label>
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