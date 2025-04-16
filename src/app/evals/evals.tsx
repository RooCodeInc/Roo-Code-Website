"use client"

import { useMemo } from "react"
import { ScatterChart, Scatter, XAxis, YAxis, Label, Customized, Cross } from "recharts"

import { type Run } from "@/db"

import { ChartConfig, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
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

const OMIT = new Set(["o3"])

export function Evals({
	runs,
}: {
	runs: (Run & { score: number; cost: number; settings?: RooCodeSettings; modelInfo?: ModelInfo | null })[]
}) {
	const data = useMemo(
		() =>
			runs
				.map((run) => ({
					label: run.description || run.model,
					score: run.score,
					cost: run.cost,
				}))
				.filter((d) => !OMIT.has(d.label)),
		[runs],
	)

	const chartConfig = useMemo(
		() => data.reduce((acc, run) => ({ ...acc, [run.label]: run }), {} as ChartConfig),
		[data],
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
						<TableHead>Pricing (In / Out)</TableHead>
						<TableHead>Cost (USD)</TableHead>
						<TableHead>Score (% Correct)</TableHead>
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
					<div className="text-center font-medium">Cost Versus Score</div>
					<ChartContainer config={chartConfig} className="h-[500px] w-full">
						<ScatterChart margin={{ top: 0, right: 0, bottom: 0, left: 20 }}>
							<XAxis
								type="number"
								dataKey="cost"
								name="Cost"
								domain={[
									(dataMin: number) => Math.round((dataMin - 5) / 5) * 5,
									(dataMax: number) => Math.round((dataMax + 5) / 5) * 5,
								]}
								tickFormatter={(value) => formatCurrency(value)}>
								<Label value="Cost" position="bottom" offset={0} />
							</XAxis>
							<YAxis
								type="number"
								dataKey="score"
								name="Score"
								domain={[
									(dataMin: number) => Math.max(0, Math.round((dataMin - 5) / 5) * 5),
									(dataMax: number) => Math.min(100, Math.round((dataMax + 5) / 5) * 5),
								]}
								tickFormatter={(value) => `${value}%`}>
								<Label value="Score" angle={-90} position="left" dy={-15} />
							</YAxis>
							<ChartTooltip content={<ChartTooltipContent labelKey="label" hideIndicator />} />
							<Customized component={renderQuadrant} />
							{data.map((d, i) => (
								<Scatter key={d.label} name={d.label} data={[d]} fill={`hsl(var(--chart-${i + 1}))`} />
							))}
							<ChartLegend content={<ChartLegendContent />} />
						</ScatterChart>
					</ChartContainer>
				</TableCaption>
			</Table>
		</div>
	)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderQuadrant = (props: any) => (
	<Cross
		width={props.width}
		height={props.height}
		x={props.width / 2 + 35}
		y={props.height / 2 - 15}
		top={0}
		left={0}
		stroke="currentColor"
		opacity={0.1}
	/>
)
