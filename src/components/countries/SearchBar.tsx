import { Search } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

interface SearchBarProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export default function SearchBar({ search, setSearch }: SearchBarProps) {
  return (
    <div className="group relative w-full md:max-w-[480px]">
      <Search
        size={18}
        aria-hidden="true"
        className="pointer-events-none absolute left-8 top-1/2 z-10 -translate-y-1/2 text-lm-input transition-all duration-300 ease-out group-hover:scale-105 dark:text-white"
      />

      <input
        type="text"
        aria-label="Search for a country"
        placeholder="Search for a country..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-md bg-white py-4 pl-20 pr-4 text-sm shadow-md outline-none transition-all duration-300 ease-out hover:-translate-y-[1px] hover:shadow-lg focus:outline-none dark:bg-dm-elements dark:placeholder:text-white"
      />
    </div>
  );
}
