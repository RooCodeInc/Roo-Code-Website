"use client"

import { useMemo } from "react"
import { z } from "zod"
import { ScatterChart, Scatter, CartesianGrid, XAxis, YAxis, LabelList, Label } from "recharts"
import { useTheme } from "next-themes"

import { type Run } from "@/db"

import { ChartConfig } from "@/components/ui/chart"
import { ModelInfo, RooCodeSettings } from "@/lib/schemas"
import { formatTokens } from "@/lib/format-tokens"
import { formatCurrency } from "@/lib/format-currency"
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui"

const chartConfig = {
	model: { label: "Model" },
	score: { label: "Score" },
	cost: { label: "Cost" },
} satisfies ChartConfig

export function Evals({
	runs,
}: {
	runs: (Run & { score: number; cost: number; settings?: RooCodeSettings; modelInfo?: ModelInfo | null })[]
}) {
	const { theme } = useTheme()

	const data = useMemo(
		() =>
			runs.map((run) => ({
				model: run.description || run.model,
				score: run.score,
				cost: run.cost,
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

			<Table className="border">
				<TableHeader>
					<TableRow>
						<TableHead>Model</TableHead>
						<TableHead>Context Window</TableHead>
						<TableHead>Pricing</TableHead>
						<TableHead>Cost (USD)</TableHead>
						<TableHead>Score</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{runs.map((run) => (
						<TableRow key={run.id}>
							<TableCell>{run.description || run.model}</TableCell>
							<TableCell>{formatTokens(run.modelInfo?.contextWindow ?? 0)}</TableCell>
							<TableCell>
								<div className="flex flex-row gap-2">
									<div>{formatCurrency(run.modelInfo?.inputPrice ?? 0)}</div>
									<div className="opacity-25">/</div>
									<div>{formatCurrency(run.modelInfo?.outputPrice ?? 0)}</div>
								</div>
							</TableCell>
							<TableCell>{formatCurrency(run.cost)}</TableCell>
							<TableCell>{run.score}%</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableCaption>
					<div className="text-center font-medium">Cost Versus Intelligence</div>
					<ChartContainer config={chartConfig} className="h-[320px] w-full">
						<ScatterChart margin={{ top: 20, right: 0, bottom: 20, left: 10 }}>
							<CartesianGrid />
							<XAxis
								type="number"
								dataKey="cost"
								name="Cost"
								domain={[0, 100]}
								tickFormatter={(value) => formatCurrency(value)}>
								<Label value="Cost (USD)" position="bottom" offset={10} />
							</XAxis>
							<YAxis
								type="number"
								dataKey="score"
								name="Score"
								domain={[50, 100]}
								tickFormatter={(value) => `${value}%`}>
								<Label value="Score" angle={-90} dy={-50} position="left" />
							</YAxis>
							<ChartTooltip content={<ChartTooltipContent hideLabel hideIndicator />} />
							<Scatter
								data={data}
								fill={theme === "dark" ? "hsl(var(--chart-1))" : "hsl(var(--chart-5))"}>
								<LabelList dataKey="model" position="right" content={renderLabel} />
							</Scatter>
						</ScatterChart>
					</ChartContainer>
				</TableCaption>
			</Table>
		</div>
	)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderLabel = (props: any) => {
	const { x, y, value } = z.object({ x: z.number(), y: z.number(), value: z.string() }).parse(props)

	return (
		<text x={x} dx={13} y={y} dy={9} fontSize={12} fill="currentColor" textAnchor="start" opacity={0.5}>
			{truncateLabel(value)}
		</text>
	)
}

const truncateLabel = (value: string, maxLength = 12) => {
	if (value.length <= maxLength) {
		return value
	}

	const truncatedValue = value.slice(0, maxLength)
	const lastSpaceIndex = truncatedValue.lastIndexOf(" ")
	return lastSpaceIndex > 0 ? value.slice(0, lastSpaceIndex) : value.slice(0, maxLength) + "..."
}
