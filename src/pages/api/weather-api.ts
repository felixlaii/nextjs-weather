import { WeatherData } from "@/components/current-weather";
import { ForecastDataItem } from "@/components/forecast";
import { SearchDataProps } from "@/types/component-types";

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_API_URL = "https://api.openweathermap.org/data/2.5/forecast";

export const getWeatherData = async (lat:string, lon: string) => {
    try {
        const response = await fetch(
            `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric`
        );
        const data: WeatherData = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching current weather data:", error);
        throw new Error(
            "Error fetching current weather data. Please try again."
        )
    }
}

export const getForecastData = async (
    lat: string, lon: string
): Promise<ForecastDataItem[] | null> => {
    try {
        const response = await fetch(
            `${FORECAST_API_URL}?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric`
        )
        const data: { list: ForecastDataItem[] } = await response.json()
        return data.list || null;
    } catch (error) {
        console.error("Error fetching forecast data:", error);
        throw new Error("Error fetching forecast data. Please try again.");
    }
}
