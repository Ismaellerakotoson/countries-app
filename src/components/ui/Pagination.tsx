import { useId } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const selectId = useId();

  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      className="mx-auto mt-12 flex w-fit max-w-full flex-wrap items-center justify-center gap-x-8 gap-y-4 rounded-2xl bg-white px-8 py-5 shadow-lg dark:bg-dm-elements"
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
        >
          <ChevronLeft size={18} />
        </button>

        <span
          aria-current="page"
          className="flex h-10 min-w-10 items-center justify-center rounded-md bg-blue-600 px-3 text-sm font-semibold text-white"
        >
          {currentPage}
        </span>

        <span className="text-sm text-gray-500 dark:text-white/70">of</span>

        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          aria-label={`Go to last page, page ${totalPages}`}
          className="flex h-10 min-w-10 cursor-pointer items-center justify-center rounded-md border border-blue-600 px-3 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-white/10"
        >
          {totalPages}
        </button>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <p className="text-sm text-gray-500 dark:text-white/70">
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex items-center gap-2 text-sm font-semibold">
        <label htmlFor={selectId}>Page</label>
        <div className="relative">
          <select
            id={selectId}
            value={currentPage}
            onChange={(e) => onPageChange(Number(e.target.value))}
            className="cursor-pointer appearance-none rounded-md border border-gray-200 bg-transparent py-1.5 pl-3 pr-8 dark:border-white/20 dark:[color-scheme:dark]"
          >
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <option key={page} value={page}>
                  {page}
                </option>
              ),
            )}
          </select>
          <ChevronDown
            size={14}
            aria-hidden="true"
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
          />
        </div>
        <span>of {totalPages}</span>
      </div>
    </nav>
  );
}