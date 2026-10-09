import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface RegionFilterProps {
  regionFilter: string;
  setRegionFilter: (region: string) => void;
  regions: string[];
}

export default function RegionFilter({
  regionFilter,
  setRegionFilter,
  regions,
}: RegionFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative w-[200px]">
  <button
    type="button"
    onClick={() => setIsOpen(!isOpen)}
    className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-white px-5 py-4 text-sm shadow-md outline-none transition-all duration-300 ease-out hover:-translate-y-[1px] hover:shadow-lg focus:outline-none dark:bg-dm-elements"
  >
    <span>{regionFilter || "Filter by Region"}</span>

    <ChevronDown
      size={16}
      className={`transition-transform duration-300 ease-out ${
        isOpen ? "rotate-180" : "rotate-0"
      }`}
    />
  </button>

  {isOpen && (
    <div className="animate-select-open absolute left-0 top-full z-20 mt-2 w-full rounded-lg bg-white shadow-md dark:bg-dm-elements">
      {regions.map((region) => (
        <button
          key={region}
          type="button"
          onClick={() => {
            setRegionFilter(region);
            setIsOpen(false);
          }}
          className="w-full px-5 py-1 text-left text-sm transition-all duration-200 ease-out hover:translate-x-1 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {region}
        </button>
      ))}
    </div>
  )}
</div>
  );
}
