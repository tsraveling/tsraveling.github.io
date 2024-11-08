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
      <main className="min-h-screen p-8 pb-20 bg-stone-50 dark:bg-stone-950 flex">
        <MarginSpacer />
        {children}
        <MarginSpacer />
      </main>
      <footer className="flex align-middle justify-center">
        <div className="py-3 text-sm text-center text-stone-500 px-2">
          All text content is licensed under{" "}
          <a
            className="font-bold hover:underline"
            href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
            target="_blank"
          >
            the CC BY-NC-ND 4.0 license
          </a>
          , attributable to <strong>T. S. Raveling</strong> or{" "}
          <strong>tsraveling.com</strong>, unless otherwise indicated.
        </div>
      </footer>
    </>
  );
};

export default Main;
