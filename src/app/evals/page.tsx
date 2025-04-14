import { getRuns } from "@/db"

import { rooCodeSettingsSchema } from "@/lib/schemas"
import { getModelInfo } from "@/lib/model-info"

import { Evals } from "./evals"

export const revalidate = 300

export default async function Page() {
	const runs = (await getRuns())
		.filter((run) => !!run.taskMetricsId)
		.sort((a, b) => b.passed - a.passed)
		.map((run) => {
			const settings = rooCodeSettingsSchema.safeParse(run.settings)

			return {
				...run,
				score: Math.round((run.passed / (run.passed + run.failed)) * 100),
				settings: settings.success ? settings.data : undefined,
				modelInfo: settings.success ? getModelInfo(settings.data) : undefined,
			}
		})

	return <Evals runs={runs} />
}
