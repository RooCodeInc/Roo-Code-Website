import { getRuns } from "@/db"

import { rooCodeSettingsSchema } from "@/lib/schemas"
import { getModelInfo } from "@/lib/model-info"

import { Evals } from "./evals"

export const revalidate = 300

export default async function Page() {
	const runs = (await getRuns())
		.filter((run) => !!run.taskMetrics)
		.filter(({ settings }) => rooCodeSettingsSchema.safeParse(settings).success)
		.sort((a, b) => b.passed - a.passed)
		.map((run) => {
			const settings = rooCodeSettingsSchema.parse(run.settings)

			return {
				...run,
				score: Math.round((run.passed / (run.passed + run.failed)) * 100),
				cost: run.taskMetrics!.cost,
				settings: settings,
				modelInfo: getModelInfo(settings),
			}
		})

	return <Evals runs={runs} />
}
