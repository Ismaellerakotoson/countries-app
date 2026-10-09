import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export default function BackButton() {
  return (
    <Link
      to="/"
      className="group inline-flex items-center gap-2 rounded-md bg-white px-8 py-2 shadow-md outline-none transition-all duration-500 ease-out hover:-translate-x-1 hover:shadow-lg focus:outline-none dark:bg-dm-elements"
    >
      <ArrowLeft
        size={18}
        aria-hidden="true"
        className="transition-transform duration-500 ease-out group-hover:-translate-x-1"
      />
      Back
    </Link>
  );
}
