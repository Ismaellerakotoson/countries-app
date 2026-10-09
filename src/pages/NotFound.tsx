import { ArrowLeft, Compass } from "lucide-react";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center py-16 text-center sm:py-24">
      <Compass
        size={64}
        aria-hidden="true"
        className="mb-6 text-gray-500 dark:text-white/70"
      />
      <p className="mb-2 text-6xl font-extrabold sm:text-8xl">404</p>
      <h1 className="mb-4 text-2xl font-extrabold sm:text-3xl">
        Page not found
      </h1>
      <p className="mb-10 max-w-md text-base">
        Sorry, the page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-md bg-white px-8 py-2 shadow-md transition-transform hover:-translate-y-1 dark:bg-dm-elements"
      >
        <ArrowLeft size={18} aria-hidden="true" />
        Back to home
      </Link>
    </section>
  );
}