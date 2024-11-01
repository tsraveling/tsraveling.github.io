"use client";

import React from "react";

const MarginSpacer = () => <div className="flex-1" />;

/**
 * Main layout component
 * @returns div with site-wide styling // RE_ADD
 */
const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen p-8 pb-20 bg-stone-50 dark:bg-stone-950 flex">
      <MarginSpacer />
      {children}
      <MarginSpacer />
    </div>
  );
};

export default Main;
