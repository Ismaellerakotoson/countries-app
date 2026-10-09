import { Moon, Sun } from "lucide-react";
import { useThemeContext } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={theme === "dark"}
      className="group flex cursor-pointer items-center gap-2 text-sm font-semibold transition-opacity duration-300 hover:opacity-75 sm:text-base"
    >
      <span className="relative flex h-[18px] w-[18px] items-center justify-center">
        <Moon
          size={18}
          aria-hidden="true"
          className={`absolute transition-all duration-300 ease-in-out ${
            theme === "dark"
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          }`}
        />

        <Sun
          size={18}
          aria-hidden="true"
          className={`absolute transition-all duration-300 ease-in-out ${
            theme === "dark"
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </span>

      <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
    </button>
  );
}
