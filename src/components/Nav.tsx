"use client";
import { clsx } from "clsx";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import {
  BlueSkyIcon,
  BookmarkIcon,
  DarkModeIcon,
  HomeIcon,
  LightModeIcon,
  TwitterIcon,
} from "./Icons";

interface NavIconLinkProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

const Tooltip = ({ label }: { label: string }) => (
  <span
    suppressHydrationWarning
    className={
      "opacity-0 group-hover:opacity-100 absolute top-10 md:top-1/2 md:-translate-y-1/2 shadow transition-all " +
      "p-2 pb-1 rounded md:w-fit mr-4 md:right-full bg-indigo-200 dark:bg-indigo-600 border-2 border-solid border-indigo-300 dark:border-indigo-500"
    }
  >
    {label}
  </span>
);

const buttonClasses =
  "group flex-1 p-3 relative dark:hover:bg-indigo-600 hover:bg-indigo-200 rounded-none hover:rounded-3xl transition-all";

const NavIconLink: React.FC<NavIconLinkProps> = ({ href, label, children }) => {
  return (
    <a href={href} className={buttonClasses}>
      {children}
      <Tooltip label={label} />
    </a>
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

  const iconClasses = "size-5 group-hover:animate-bounce transition-all";

  return (
    <nav
      className={
        "fixed top-0 left-0 w-screen flex justify-center h-11 items-center gap-5 px-16 bg-stone-100 dark:bg-stone-900 " +
        "md:flex-col md:gap-3 md:mt-10 md:w-4 md:px-6 md:sticky md:h-fit md:pt-16 md:ml-6 md:bg-transparent md:dark:bg-transparent"
      }
    >
      <NavIconLink href="/" label="Home">
        <HomeIcon className={iconClasses} />
      </NavIconLink>
      <NavIconLink href="/" label="Share">
        <BookmarkIcon className={iconClasses} />
      </NavIconLink>
      <NavIconLink href="/" label="Comment on BlueSky">
        <BlueSkyIcon className={iconClasses} />
      </NavIconLink>
      <NavIconLink href="/" label="Comment on Twitter">
        <TwitterIcon className={iconClasses} />
      </NavIconLink>
      <button
        className={buttonClasses + " -mt-1"}
        onClick={toggleTheme}
        aria-label="Toggle dark mode"
        suppressHydrationWarning
      >
        {/* Suppressed bc we're pulling the theme from session on client */}
        {theme === "dark" ? (
          <DarkModeIcon className={iconClasses} />
        ) : (
          <LightModeIcon className={iconClasses} />
        )}
        <Tooltip label={(theme === "dark" ? "Dark" : "Light") + " Mode"} />
      </button>
    </nav>
  );
};

export default Nav;
