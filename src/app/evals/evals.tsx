"use client"

import { useMemo } from "react"

import { type Run } from "@/db"
import { formatTokens } from "@/lib/format-tokens"
import { OpenRouterModel } from "@/lib/hooks/use-open-router-models"

import { Platform } from "./platform"

export function Evals({ runs }: { runs: (Run & { score: number; openRouterModel?: OpenRouterModel })[] }) {
	const [first, second, third] = runs

	// https://dribbble.com/shots/2277946
	const colors = useMemo(() => ["#1f242dff", "#1f242dcc", "#1f242d99", "#1f242d66", "#1f242d33", "#1f242d11"], [])

	return (
		<div className="mx-auto my-16 max-w-screen-lg">
			<div className="flex flex-col gap-10">
				{first && second && third && (
					<div className="mt-16 hidden md:block">
						<div className="podium">
							<Platform className="mt-6" rank={2}>
								{second.openRouterModel?.name ?? second.model}
							</Platform>
							<Platform className="mt-0" rank={1}>
								{first.openRouterModel?.name ?? first.model}
							</Platform>
							<Platform className="mt-8" rank={3}>
								{third.openRouterModel?.name ?? third.model}
							</Platform>
						</div>
					</div>
				)}
				<div className="flex flex-col border">
					{runs.map((run, index) => (
						<div key={run.id} className="relative h-20">
							<div
								className="absolute h-full"
								style={{
									backgroundColor: colors[index],
									width: `${run.score}%`,
								}}
							/>
							<div className="absolute inset-0 p-4">
								<div className="flex h-full items-center justify-between">
									<div className="flex items-center gap-5">
										<div className="text-xl">{index + 1}</div>
										<div>
											<div className="font-medium">{run.openRouterModel?.name ?? run.model}</div>
											<div className="flex flex-row gap-2 text-sm opacity-50">
												<div>{run.openRouterModel?.id}</div>
												<div>/</div>
												<div>{formatTokens(run.openRouterModel?.context_length ?? 0)}</div>
											</div>
										</div>
									</div>
									<div className="font-mono text-2xl">{run.score}%</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
