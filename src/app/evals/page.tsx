import { getRuns } from "@/db"

import { Evals } from "./evals"
import { getOpenRouterModels } from "@/lib/hooks/use-open-router-models"

export const revalidate = 300

export default async function Page() {
	const models = await getOpenRouterModels()

	const runs = (await getRuns())
		.filter((run) => !!run.taskMetricsId)
		.sort((a, b) => b.passed - a.passed)
		.map((run) => ({
			...run,
			score: Math.round((run.passed / (run.passed + run.failed)) * 100),
			openRouterModel: models.find((model) => model.id === run.model),
		}))

	return <Evals runs={runs} />
}
