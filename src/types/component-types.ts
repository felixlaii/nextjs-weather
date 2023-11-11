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


  
  // The onSearchChange prop should have this signature:
  export interface SearchProps {
    onSearchChange: (searchData: SearchDataProps) => void;
  }