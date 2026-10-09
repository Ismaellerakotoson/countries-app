import { useState } from "react";
import { useCountriesContext } from "../context/CountriesContext";

export function useCountries() {
  const { countries, loading, error } = useCountriesContext();
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  const regions = [...new Set(countries.map((c) => c.region))].sort();

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.names.common
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesRegion = region === "" || country.region === region;
    return matchesSearch && matchesRegion;
  });

  return {
    filteredCountries,
    regions,
    search,
    setSearch,
    region,
    setRegion,
    loading,
    error,
  };
}