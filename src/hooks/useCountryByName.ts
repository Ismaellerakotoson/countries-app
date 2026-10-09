import { useCountriesContext } from "../context/CountriesContext";

export function useCountryByName(name: string | undefined) {
  const { countries, loading, error } = useCountriesContext();
  const country = countries.find((c) => c.names.common === name);

  return { country, loading, error };
}