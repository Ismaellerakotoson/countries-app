import { useParams } from "react-router";
import CountryDetails from "../components/countries/CountryDetails";
import { useCountriesContext } from "../context/CountriesContext";
import BackButton from "../components/ui/BackButton";
import Loader from "../components/ui/Loader";
import { SearchX } from "lucide-react";

export default function CountryPage() {
  const { name } = useParams();
  const { countries, loading, error } = useCountriesContext();

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  const country = countries.find((c) => c.names.common === name);

  if (!country) {
    return (
      <section className="flex flex-col items-center py-16 text-center sm:py-24">
        <SearchX
          size={64}
          aria-hidden="true"
          className="mb-6 text-gray-500 dark:text-white/70"
        />
        <h1 className="mb-4 text-2xl font-extrabold sm:text-3xl">
          Country not found
        </h1>
        <p className="mb-10 max-w-md">
          We couldn't find any country named{" "}
          <span className="font-semibold">{name}</span>.
        </p>
        <BackButton />
      </section>
    );
  }

  return (
    <>
      <div className="mb-12 sm:mb-16">
        <BackButton />
      </div>
      <CountryDetails country={country} />
    </>
  );
}
