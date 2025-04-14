"use client"

import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { useTheme } from "next-themes"

import { type Run } from "@/db"

import { ModelInfo, RooCodeSettings } from "@/lib/schemas"
import { formatTokens } from "@/lib/format-tokens"
import { formatCurrency } from "@/lib/format-currency"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"

const chartConfig = {
	model: { label: "Model" },
	score: { label: "Score" },
} satisfies ChartConfig

export function Evals({
	runs,
}: {
	runs: (Run & { score: number; settings?: RooCodeSettings; modelInfo?: ModelInfo | null })[]
}) {
	const { theme } = useTheme()

	const data = useMemo(
		() =>
			runs.map((run) => ({
				model: run.description || run.model,
				score: run.score,
			})),
		[runs],
	)

	return (
		<div className="mx-auto flex max-w-screen-lg flex-col gap-8 p-8">
			<div className="flex flex-col gap-4">
				<div>
					Roo Code tests each frontier model against{" "}
					<a href="https://github.com/cte/evals/" className="underline">
						a suite of hundreds of exercises
					</a>{" "}
					across 5 programming languages with varying difficulty. These results can help you find the right
					price-to-intelligence ratio for your use case.
				</div>
				<div>
					Want to see the results for a model we haven&apos;t tested yet? Ping us in{" "}
					<a href="https://discord.gg/roocode" className="underline">
						Discord
					</a>
					.
				</div>
			</div>

			<ChartContainer config={chartConfig} className="h-[320px]">
				<BarChart accessibilityLayer data={data} margin={{ bottom: 50 }}>
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

			<div className="flex flex-col">
				<div>
					<div className="grid grid-cols-3 gap-4 border-b p-4 md:grid-cols-6">
						<div className="col-span-2">
							<div>Model</div>
							<div className="text-sm opacity-50">Provider ID</div>
						</div>
						<div className="hidden md:block">Context Window</div>
						<div className="hidden md:block" title="Per 1M Tokens">
							<div>Price</div>
							<div className="text-sm opacity-50">Input / Output</div>
						</div>
						<div className="hidden md:block">Diff Edit?</div>
						<div className="text-right">Score</div>
					</div>
				</div>
				{runs.map((run) => (
					<div key={run.id} className="relative">
						<div
							className="absolute h-full bg-chart-5/10 dark:bg-chart-1/10"
							style={{ width: `${run.score}%` }}
						/>
						<div className="grid grid-cols-3 items-center gap-4 p-4 md:grid-cols-6">
							<div className="col-span-2">
								{run.description ? (
									<div>
										<div className="font-medium">{run.description}</div>
										<div className="text-sm opacity-50">{run.model}</div>
									</div>
								) : (
									<div className="font-medium">{run.model}</div>
								)}
							</div>
							<div className="hidden md:block">{formatTokens(run.modelInfo?.contextWindow ?? 0)}</div>
							<div className="hidden flex-row gap-2 md:flex">
								<div>{formatCurrency(run.modelInfo?.inputPrice ?? 0)}</div>
								<div className="opacity-25">/</div>
								<div>{formatCurrency(run.modelInfo?.outputPrice ?? 0)}</div>
							</div>
							<div className="hidden md:block">{run.settings?.diffEnabled === false ? "No" : "Yes"}</div>
							<div className="text-right font-mono text-2xl">{run.score}%</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ModelTick = ({ x, y, payload }: any) => {
	return (
		<g transform={`translate(${x},${y})`}>
			<text x={0} dx={0} y={0} dy={0} textAnchor="end" fill="#666" transform="rotate(-90)">
				{truncate(payload.value.split(": ")[1] ?? payload.value, 10)}
			</text>
		</g>
	)
}

const truncate = (str: string, maxLength: number) => (str.length <= maxLength ? str : str.slice(0, maxLength) + "...")
