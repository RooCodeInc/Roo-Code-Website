"use client"

import { useTheme } from "next-themes"

export function useLogoSrc(variant: "withText" | "icon" = "withText"): string {
	const { resolvedTheme } = useTheme()

	if (variant === "withText") {
		return resolvedTheme === "light" ? "/Roo-Code-Logo-Horiz-blk.svg" : "/Roo-Code-Logo-Horiz-white.svg"
	} else {
		return resolvedTheme === "light" ? "/roo-black.svg" : "/roo-white.svg"
	}
}
