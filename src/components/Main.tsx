"use client";

import React from "react";

const MarginSpacer = () => <div className="flex-1" />;

/**
 * Main layout component
 * @returns div with site-wide styling // RE_ADD
 */
const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <main className="min-h-screen p-8 pb-20 bg-gray-50 dark:bg-gray-950 flex">
        <MarginSpacer />
        {children}
        <MarginSpacer />
      </main>
      <footer className="flex align-middle justify-center">
        <div className="py-3 text-sm text-center text-gray-500 px-2">
          All text content is licensed under{" "}
          <a
            className="font-bold hover:underline group relative"
            href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
            target="_blank"
            data-tooltip-target="tooltip-attribution"
          >
            the CC BY-NC-ND 4.0 license
            <div
              id="tooltip-attribution"
              role="tooltip"
              className="absolute bottom-full left-1/2 -translate-x-1/2 invisible mb-4 group-hover:visible opacity-0 group-hover:opacity-70 z-10 inline-block px-3 pt-2 pb-1 text-xs font-medium text-gray-800 transition-opacity duration-300 bg-gray-200 rounded-lg shadow-sm w-max tooltip dark:bg-gray-700 dark:text-gray-100"
            >
              Attributable to <strong>T. S. Raveling</strong> or{" "}
              <strong>tsraveling.com</strong>
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </a>
          , unless otherwise indicated.
        </div>
      </footer>
    </>
  );
};

export default Main;
