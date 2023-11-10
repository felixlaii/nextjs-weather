import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from "react";
import { SearchDataProps } from '@/types/component-types';


const inter = Inter({ subsets: ['latin'] })

const Home: React.FC = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData: SearchDataProps) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`)
    const forecastFetch = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`)

    Promise.all([currentWeatherFetch, forecastFetch])
    .then(async (response) => {
      const weatherResponse = await response[0].json();
      const forcastResponse = await response[1].json();

      setCurrentWeather({ city: searchData.label, ...weatherResponse });
      setForecast({ city: searchData.label, ...forcastResponse });
    })
    .catch(console.log);
  }
  return (
    <div>

    </div>
  )
}
 export default Home;