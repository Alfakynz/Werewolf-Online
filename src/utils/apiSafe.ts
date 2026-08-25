export async function fetchSafe<T>(
	promise: Promise<T>,
	label: string,
	silentStatus: number[] = [],
): Promise<T | null> {
	try {
		return await promise
	} catch (e) {
		const status =
			e instanceof Error && 'status' in e
				? (e as Error & { status?: number }).status
				: undefined
		if (status !== undefined && silentStatus.includes(status)) {
			console.log(`${label} : rien (${status})`)
		} else {
			console.error(`${label} KO`, e)
		}
		return null
	}
}
