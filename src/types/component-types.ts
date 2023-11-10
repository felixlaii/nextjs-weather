export interface SearchDataProps {
    value: string;
    label: string;
    onSearchChange?: (searchData: SearchDataProps) => void;
    inputValue: string;
    city: string;
    latitude: string;
    longitude: string;
    countryCode: string;
    name: string;
    searchData: string;
  }
  