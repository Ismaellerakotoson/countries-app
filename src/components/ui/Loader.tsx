export default function Loader() {
  return (
    <div
      role="status"
      className="flex min-h-[40vh] items-center justify-center gap-3"
    >
      <span className="h-4 w-4 animate-bounce rounded-full bg-lm-text motion-reduce:animate-none dark:bg-white" />
      <span className="h-4 w-4 animate-bounce rounded-full bg-lm-text [animation-delay:150ms] motion-reduce:animate-none dark:bg-white" />
      <span className="h-4 w-4 animate-bounce rounded-full bg-lm-text [animation-delay:300ms] motion-reduce:animate-none dark:bg-white" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}