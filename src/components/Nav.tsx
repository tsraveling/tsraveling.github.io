"use client";
import { clsx } from "clsx";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const NavLink: React.FC<{ href: string; title: string }> = ({
  href,
  title,
}) => {
  return (
    <li>
      <a
        href={href}
        className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
        aria-current="page"
      >
        {title}
      </a>
    </li>
  );
};

interface NavProps {
  showOnlyOnHover?: boolean;
}

const Nav: React.FC<NavProps> = ({ showOnlyOnHover = true }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (!mounted) return;
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav
      className={clsx(
        "fixed top-0 bg-background-alt left-0 w-full shadow-md z-50",
        showOnlyOnHover &&
          "opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out"
      )}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/">tsraveling.com</a>

        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <NavLink href="/" title="Home" />
            <NavLink href="/" title="About" />
            <NavLink href="/" title="Contact" />
            {mounted && <button onClick={() => toggleTheme()}>{theme}</button>}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
