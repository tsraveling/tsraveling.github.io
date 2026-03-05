"use client";
import { useTheme } from "next-themes";
import React, { useCallback, useState, useSyncExternalStore } from "react";
import { useClipboard } from "@/hooks/useClipboard";
import { useShare } from "@/hooks/useShare";
import { useBluesky } from "@/hooks/useBluesky";
import {
  BlueSkyIcon,
  BookmarkIcon,
  DarkModeIcon,
  HomeIcon,
  LightModeIcon,
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
      "opacity-0 group-hover:opacity-100 pointer-events-none absolute top-10 md:top-1/2 md:-translate-y-1/2 " +
      "md:w-fit ml-4 md:left-full text-[19px] whitespace-nowrap " +
      "text-[var(--text)] transition-opacity duration-200"
    }
  >
    {label}
  </span>
);

const buttonClasses =
  "group p-2.5 relative rounded-full border border-transparent hover:border-[var(--text)] transition-all duration-200";

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

const SHARE_LABEL = "Share";
const SHARE_COPIED_LABEL = "URL Copied!";

const Nav: React.FC<NavProps> = ({ showOnlyOnHover = true }) => {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const { theme, setTheme } = useTheme();
  const [shareLabel, setShareLabel] = useState(SHARE_LABEL);
  const share = useShare();
  const clip = useClipboard();
  const { shareBs } = useBluesky();

  const toggleTheme = () => {
    if (!mounted) return;
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    const result = await share(url);
    if ("error" in result) return;
    if (result.status === "WEB") {
      setShareLabel(SHARE_COPIED_LABEL);
      await clip(url);
      setShareLabel(SHARE_LABEL);
    }
  }, [share, clip]);

  const iconClasses = "size-5 transition-all";

  return (
    <nav
      className={
        "fixed top-0 left-0 w-screen flex justify-center h-11 items-center gap-1 px-16 bg-background " +
        "md:flex-col md:gap-1 md:mt-10 md:w-4 md:px-6 md:sticky md:h-fit md:pt-16 md:ml-6 md:bg-transparent"
      }
    >
      <NavIconLink href="/" label="Home">
        <HomeIcon className={iconClasses} />
      </NavIconLink>
      <button className={buttonClasses} onClick={handleShare}>
        <BookmarkIcon className={iconClasses} />
        <Tooltip label={shareLabel} />
      </button>
      <button
        className={buttonClasses}
        onClick={() => shareBs(window.location.href)}
      >
        <BlueSkyIcon className={iconClasses} />
        <Tooltip label="Comment on BlueSky" />
      </button>
      <button
        className={buttonClasses}
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
