"use client";

import clsx from "clsx";
import React, { useEffect } from "react";

/**
 * Main layout component
 * @returns div with site-wide styling
 */
const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log(">>> localStorage theme:", localStorage.theme);
      const darkMode =
        "theme" in localStorage
          ? localStorage.theme === "dark"
          : window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(darkMode);
      if (darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  });

  console.log(">>> rendering with dark mode:", isDarkMode);

  return (
    <div
      className={clsx(
        isDarkMode && "dark",
        "grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
      )}
    >
      {children}
    </div>
  );
};

export default Main;
