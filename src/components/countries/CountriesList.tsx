import { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import SearchBar from "./SearchBar";
import RegionFilter from "./RegionFilter";
import Pagination from "../ui/Pagination";
import { useCountriesContext } from "../../context/CountriesContext";
import Loader from "../ui/Loader";

export default function CountriesList() {
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { countries, loading, error } = useCountriesContext();

  useEffect(() => {
    setCurrentPage(1);
  }, [search, regionFilter]);

  if (loading) {
    return <Loader />;
  }

  if (error !== null) {
    return <p>{error}</p>;
  }

  const regions = [
    ...new Set(countries.map((country) => country.region)),
  ].sort();

  const filteredByRegions = countries.filter(
    (country) => regionFilter === "" || country.region === regionFilter,
  );

  const filteredCountries = filteredByRegions.filter((country) =>
    country.names.common.toLowerCase().includes(search.toLowerCase()),
  );

  const countriesPerPage = 24;

  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

  const startIndex = (currentPage - 1) * countriesPerPage;

  const currentCountries = filteredCountries.slice(
    startIndex,
    startIndex + countriesPerPage,
  );

  return (
    <div>
      <div className="mb-8 flex flex-col items-start gap-10 md:mb-12 md:flex-row md:items-center md:justify-between">
        <SearchBar search={search} setSearch={setSearch} />

        <RegionFilter
          regionFilter={regionFilter}
          setRegionFilter={setRegionFilter}
          regions={regions}
        />
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-10 lg:gap-18 sm:px-10">
        {currentCountries.map((country) => (
          <div key={country.names.common} className="animate-country-card">
            <CountryCard country={country} />
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
