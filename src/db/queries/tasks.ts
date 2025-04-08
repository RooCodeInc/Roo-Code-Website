import { and, eq } from "drizzle-orm"

import { RecordNotFoundError } from "./errors"
import { tasks } from "../schema"
import { db } from "../db"

const table = tasks

export const findTask = async (id: number) => {
	const run = await db.query.tasks.findFirst({ where: eq(table.id, id) })

	if (!run) {
		throw new RecordNotFoundError()
	}

	return run
}

type GetTask = {
	runId: number
	language: string
	exercise: string
}

export const getTask = async ({ runId, language, exercise }: GetTask) =>
	db.query.tasks.findFirst({
		where: and(eq(table.runId, runId), eq(table.language, language), eq(table.exercise, exercise)),
	})

export const getTasks = async (runId: number) =>
	db.query.tasks.findMany({ where: eq(table.runId, runId), with: { taskMetrics: true } })
