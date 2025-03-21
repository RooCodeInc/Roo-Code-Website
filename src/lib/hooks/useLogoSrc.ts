"use client";

import { useTheme } from "next-themes";

/**
 * Custom hook to get the appropriate logo source based on the current theme
 * @returns The path to the logo image file
 */
export function useLogoSrc(): string {
  const { resolvedTheme } = useTheme();
  
  // Default to white logo if theme is undefined or dark
  return resolvedTheme === 'light'
    ? '/Roo-Code-Logo-Horiz-blk.svg'
    : '/Roo-Code-Logo-Horiz-white.svg';
}