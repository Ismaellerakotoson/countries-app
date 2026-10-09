import ThemeToggle from "./ThemeToggle";

const TITLE = "Where in the world?";

export default function Header() {
  return (
    <header className="bg-white shadow-md dark:bg-dm-elements">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-6 sm:px-10">
        <p className="text-sm font-extrabold sm:text-2xl">
          <span className="sr-only">{TITLE}</span>
          <span aria-hidden="true">
            {TITLE.split("").map((char, index) => (
              <span
                key={index}
                className="animate-letter-reveal inline-block"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        </p>

        <ThemeToggle />
      </div>
    </header>
  );
}