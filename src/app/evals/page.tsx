import { getRuns } from "@/db"

import { getLanguageScores } from "@/lib/server/get-language-scores"
import { rooCodeSettingsSchema } from "@/lib/schemas"
import { getModelInfo } from "@/lib/model-info"
import { formatScore } from "@/lib"

import { Evals } from "./evals"

export const revalidate = 300

export default async function Page() {
	const languageScores = await getLanguageScores()

	const runs = (await getRuns())
		.filter((run) => !!run.taskMetrics)
		.filter(({ settings }) => rooCodeSettingsSchema.safeParse(settings).success)
		.sort((a, b) => b.passed - a.passed)
		.map((run) => {
			const settings = rooCodeSettingsSchema.parse(run.settings)

			return {
				...run,
				label: run.description || run.model,
				score: formatScore(run.passed / (run.passed + run.failed)),
				languageScores: languageScores[run.id],
				taskMetrics: run.taskMetrics!,
				settings: settings,
				modelInfo: getModelInfo(settings),
			}
		})

	return <Evals runs={runs} />
}
