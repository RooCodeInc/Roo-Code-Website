import React from "react"

import { cn } from "@/lib/utils"

export type PlatformProps = React.HTMLAttributes<HTMLDivElement> & {
	rank: number
}

export const Platform = ({ rank, className, children, ...props }: PlatformProps) => (
	<div className={cn("platform py-10", className)} {...props}>
		<div className="absolute -top-10 left-1/2 w-full -translate-x-1/2 overflow-hidden text-nowrap text-center text-xl">
			{children}
		</div>
		<div className="text-center font-mono text-3xl opacity-50">{rank}</div>
	</div>
)
