import { TriangleAlert } from "lucide-react";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="mx-auto flex max-w-md flex-col items-center rounded-md bg-white px-8 py-12 text-center shadow-md dark:bg-dm-elements"
    >
      <TriangleAlert
        size={48}
        aria-hidden="true"
        className="mb-4 text-red-500 dark:text-red-400"
      />
      <h2 className="mb-2 text-xl font-extrabold">Something went wrong</h2>
      <p className="mb-4 text-sm">
        We couldn't load the countries. Please try again in a few moments.
      </p>
      <p className="text-xs text-gray-600 dark:text-white/70">{message}</p>
    </div>
  );
}