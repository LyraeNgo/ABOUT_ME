import { useEffect, useState } from "react";
import {Sun, Moon} from "lucide-react"
const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") return saved;
  const prefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
  const isDark = theme === "dark";

  const timer = setTimeout(() => {

    document.documentElement.classList.toggle(
      "dark",
      isDark
    );

    localStorage.setItem("theme", theme);

  }, 100);

  return () => clearTimeout(timer);

}, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-black/5 px-3 py-2 text-xs text-zinc-700 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <span className="font-mono">{theme === "dark" ? <Moon /> : <Sun />}</span>
    </button>
  );
};

export default ThemeToggle;
