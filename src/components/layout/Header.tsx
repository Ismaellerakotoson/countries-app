import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="bg-white shadow-md dark:bg-dm-elements">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-6 sm:px-10">
        <h1 className="text-sm font-extrabold sm:text-2xl">
          {"Where in the world?".split("").map((char, index) => (
            <span
              key={index}
              className="animate-letter-reveal inline-block"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <ThemeToggle />
      </div>
    </header>
  );
}
