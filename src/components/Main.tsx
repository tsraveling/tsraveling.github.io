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
        <div className="py-3 text-sm text-stone-500">© 2024 Tim Raveling.</div>
      </footer>
    </>
  );
};

export default Main;
