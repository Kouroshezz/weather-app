import { createContext, useState, type ReactNode } from "react";

type City = {
  cityName: string;
  key: string;
} | null;

type CityContextType = {
  selectedCity: City;
  setSelectedCity: (city: City) => void;
};

export const CityContext = createContext<CityContextType>({
  selectedCity: null,
  setSelectedCity: () => { },
});

export function CityProvider({ children }: { children: ReactNode }) {
  const [selectedCity, setSelectedCity] = useState<City>(null);

  return (
    <CityContext value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext>
  );
}
