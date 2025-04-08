"use client"

import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { type Run } from "@/db"
import { formatTokens } from "@/lib/format-tokens"
import { OpenRouterModel } from "@/lib/hooks/use-open-router-models"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"
import { useTheme } from "next-themes"

const chartConfig = {
	model: { label: "Model" },
	score: { label: "Score" },
} satisfies ChartConfig

export function Evals({ runs }: { runs: (Run & { score: number; openRouterModel?: OpenRouterModel })[] }) {
	const { theme } = useTheme()

	const data = useMemo(
		() =>
			runs.slice(0, 5).map((run) => ({
				model: run.openRouterModel?.name ?? run.model,
				score: run.score,
			})),
		[runs],
	)

	return (
		<div className="mx-auto my-4 flex max-w-screen-lg flex-col gap-4">
			<div>
				<div className="p-2 text-lg font-medium">
					<div>Top Performing Models</div>
					<div className="text-sm text-muted-foreground">
						Looking for the best model to pair with Roo Code? Here&apos;s what the data shows.
					</div>
				</div>
				<ChartContainer config={chartConfig} className="h-[300px] w-full">
					<BarChart accessibilityLayer data={data} margin={{ bottom: 100 }}>
						<CartesianGrid vertical={false} />
						<XAxis interval={0} dataKey="model" tickLine={false} tick={<ModelTick />} allowDataOverflow />
						<ChartTooltip content={<ChartTooltipContent />} />
						<Bar
							dataKey="score"
							fill={theme === "dark" ? "hsl(var(--chart-1))" : "hsl(var(--chart-5))"}
							radius={2}
						/>
					</BarChart>
				</ChartContainer>
			</div>
			<div>
				<div className="p-2 text-lg font-medium">
					<div>Eval Scores</div>
					<div className="text-sm text-muted-foreground">
						Each model is tested using a suite of hundreds of exercises across 5 programming languages with
						varying difficulty.
					</div>
				</div>
				<div className="flex flex-col border">
					{runs.map((run, index) => (
						<div key={run.id} className="relative h-20">
							<div
								className="absolute h-full bg-chart-5/10 dark:bg-chart-1/10"
								style={{ width: `${run.score}%` }}
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ModelTick = ({ x, y, payload }: any) => {
	return (
		<g transform={`translate(${x},${y})`}>
			<text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-45), translate(15, 10)">
				{payload.value.split(": ")[1] ?? payload.value}
			</text>
		</g>
	)
}
