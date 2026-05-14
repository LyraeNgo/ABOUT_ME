import { NavLink } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";

const Navbar = () => {
  const navClass = ({ isActive }) =>
    isActive
      ? "text-cyan-600 dark:text-cyan-300"
      : "text-zinc-700 hover:text-black/80 dark:text-zinc-300 dark:hover:text-white/90";

  return (
    <nav className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink
          to="/"
          className="font-mono text-sm text-zinc-900 hover:text-black/80 dark:text-zinc-200 dark:hover:text-white"
        >
          <span className="text-cyan-600 dark:text-cyan-300">api</span>.portfolio
        </NavLink>

        <div className="flex gap-6 text-sm">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>

          <NavLink to="/about" className={navClass}>
            About
          </NavLink>

          {/* <NavLink to="/projects" className={navClass}>
            Projects
          </NavLink> */}

          <NavLink to="/contact" className={navClass}>
            Contact
          </NavLink>
        </div>

        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
