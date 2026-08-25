import type { ClanModifiers } from '@/types/clan'

const API_URL: string = import.meta.env.VITE_API_URL

export async function getClanModifiers(clanId: string): Promise<ClanModifiers> {
	try {
		const response = await fetch(`${API_URL}/api/bonus/${clanId}`)
		if (!response.ok) {
			const error = new Error(`API error: ${response.status}`) as Error & { status?: number }
			error.status = response.status
			throw error
		}
		return await response.json()
	} catch (err) {
		console.error('Erreur lors de la récupération des bonus/malus:', err)
		throw err
	}
}
