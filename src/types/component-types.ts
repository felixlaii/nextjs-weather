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