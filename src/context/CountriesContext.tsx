import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Country } from "../types/country";
import { getAllCountries } from "../services/countriesApi";

export interface CountryInterface {
  countries: Country[];
  loading: boolean;
  error: string | null;
}

export const CountriesContext = createContext<CountryInterface | undefined>(
  undefined,
);

export function useCountryState() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(()=>{
     getAllCountries()
     .then((data) => {
        setCountries(data)
     })
     .catch((err) => {
        setError(err.message)
     })
     .finally(()=>{
        setLoading(false)
     })
  },[])

    console.log("countries dans state",countries)

  return { countries, loading, error };
}

export function CountriesProvider({ children }: { children: ReactNode }) {
  const contriesState = useCountryState();
  return (
    <CountriesContext.Provider value={contriesState}>
      {children}
    </CountriesContext.Provider>
  );
}

export function useCountriesContext() {
  const context = useContext(CountriesContext);

  if (!context) {
    throw new Error("CountriesContext must be used within a CountriesProvider");
  }

  return context;
}
