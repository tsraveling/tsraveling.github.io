"use client";
import React from "react";

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

const Nav: React.FC = () => {
  const toggleTheme = () => {
    const isDarkNow = document.documentElement.classList.toggle("dark");
    console.log(">>> dark mode:", isDarkNow);
    localStorage.theme = isDarkNow ? "dark" : "light";
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          Home
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <NavLink href="/" title="Home" />
            <NavLink href="/" title="About" />
            <NavLink href="/" title="Contact" />
            <button onClick={() => toggleTheme()}>Toggle Theme</button>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
