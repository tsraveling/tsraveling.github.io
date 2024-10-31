"use client";

import React from "react";

/**
 * Main layout component
 * @returns div with site-wide styling
 */
const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-stone-50 dark:bg-stone-950">
      {children}
    </div>
  );
};

export default Main;
