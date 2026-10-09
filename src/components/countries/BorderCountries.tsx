import { Link } from "react-router";
import { useCountriesContext } from "../../context/CountriesContext";
import type { Country } from "../../types/country";

interface BorderCountriesProps {
  borders: string[];
}

export default function BorderCountries({ borders }: BorderCountriesProps) {
  const { countries } = useCountriesContext();
  const borderCountries = borders
    .map((code) => countries.find((c) => c.codes.alpha_3 === code))
    .filter((c): c is Country => c !== undefined);

  if (borderCountries.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
      <h2 className="whitespace-nowrap font-semibold lg:py-1">
        Border Countries:
      </h2>
      <ul className="flex flex-wrap gap-2">
        {borderCountries.map((c) => (
          <li key={c.codes.alpha_3}>
            <Link
              to={`/country/${encodeURIComponent(c.names.common)}`}
              className="block rounded-sm bg-white px-6 py-1 text-sm shadow-md outline-none transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg focus:outline-none dark:bg-dm-elements"
            >
              {c.names.common}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
