import { ChevronDown } from "lucide-react";

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
  return (
    <div className="relative w-[200px]">
      <select
        aria-label="Filter by Region"
        value={regionFilter}
        onChange={(e) => setRegionFilter(e.target.value)}
        className="w-full cursor-pointer appearance-none rounded-md bg-white py-4 pl-6 pr-12 text-sm shadow-md dark:bg-dm-elements dark:[color-scheme:dark]"
      >
        <option value="">All Regions</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        aria-hidden="true"
        className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2"
      />
    </div>
  );
}