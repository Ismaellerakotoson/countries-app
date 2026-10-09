import { Link } from "react-router";
import type { Country } from "../../types/country";
import { formatPopulation } from "../../utils/formatPopulation";

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  const capital = country.capitals.map((c) => c.name).join(", ") || "N/A";

  return (
    <Link
      to={`/country/${encodeURIComponent(country.names.common)}`}
      className="group block overflow-hidden rounded-md bg-white shadow-md transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-xl dark:bg-dm-elements"
    >
      <div className="overflow-hidden">
        <img
          src={country.flag.url_svg}
          alt={`Flag of ${country.names.common}`}
          loading="lazy"
          className="aspect-[5/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="px-6 pb-10 pt-6">
        <h2 className="mb-4 text-lg font-extrabold">
          {country.names.common}
        </h2>

        <p className="text-sm">
          <span className="font-semibold">Population:</span>{" "}
          {formatPopulation(country.population)}
        </p>

        <p className="text-sm">
          <span className="font-semibold">Region:</span> {country.region}
        </p>

        <p className="text-sm">
          <span className="font-semibold">Capital:</span> {capital}
        </p>
      </div>
    </Link>
  );
}