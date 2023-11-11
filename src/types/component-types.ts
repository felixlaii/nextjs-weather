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
    onSearchChange?: (searchData: SearchDataProps) => void;
  }