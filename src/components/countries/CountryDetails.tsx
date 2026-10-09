import type { Country } from "../../types/country";
import { formatPopulation } from "../../utils/formatPopulation";
import { getNativeName } from "../../utils/getNativeName";
import BorderCountries from "./BorderCountries";

interface CountryDetailsProps {
  country: Country;
}

export default function CountryDetails({ country }: CountryDetailsProps) {
  const capital = country.capitals.map((c) => c.name).join(", ") || "N/A";
  const currencies = country.currencies.map((c) => c.name).join(", ") || "N/A";
  const languages = country.languages.map((l) => l.name).join(", ") || "N/A";
  const tlds = country.tlds.join(", ") || "N/A";

  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-32">
      <img
        src={country.flag.url_svg}
        alt={`Flag of ${country.names.common}`}
        className="w-full max-w-[560px] shadow-lg"
      />

      <div>
        <h1 className="mb-6 text-3xl font-bold">{country.names.common}</h1>

        <div className="grid gap-10 sm:grid-cols-2">
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Native Name:</span>{" "}
              {getNativeName(country)}
            </p>
            <p>
              <span className="font-semibold">Population:</span>{" "}
              {formatPopulation(country.population)}
            </p>
            <p>
              <span className="font-semibold">Region:</span> {country.region}
            </p>
            <p>
              <span className="font-semibold">Sub Region:</span>{" "}
              {country.subregion || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Capital:</span> {capital}
            </p>
          </div>

          <div className="space-y-2">
            <p>
              <span className="font-semibold">Top Level Domain:</span> {tlds}
            </p>
            <p>
              <span className="font-semibold">Currencies:</span> {currencies}
            </p>
            <p>
              <span className="font-semibold">Languages:</span> {languages}
            </p>
          </div>
        </div>

        <div className="animate-border-countries mt-12">
          <BorderCountries borders={country.borders} />
        </div>
      </div>
    </div>
  );
}
