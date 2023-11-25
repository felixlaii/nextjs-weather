export interface SearchDataProps {
  value: string;
  label: string;
  inputValue: string;
  city: string;
  latitude: string;
  longitude: string;
  countryCode: string;
  name: string;
  searchData: string;
}

export interface SearchProps {
  onSearchChange: (searchData: SearchDataProps) => void;
}

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

export interface CurrentWeatherProps {
  data: WeatherData;
}
