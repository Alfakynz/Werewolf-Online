import type { QuestData, Announcement, AvailableQuest, Player, ClanInfo, Role } from '@/types/index'

const API_URL: string = 'https://api.wolvesville.com'
const API_KEY: string = import.meta.env.VITE_API_KEY
export const CLAN_ID: string = '28f85d51-37b1-4fc6-a938-47656353363c'
export const CLAN_NAME: string = 'WerewoIf OnIine*'

const HEADERS = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
	Authorization: `Bot ${API_KEY}`,
}

async function apiFetch<T>(path: string): Promise<T> {
	const response = await fetch(`${API_URL}${path}`, { headers: HEADERS })
	if (!response.ok) {
		const error = new Error(`API error: ${response.status}`) as Error & { status?: number }
		error.status = response.status
		throw error
	}
	return response.json()
}

export const searchUser = (name: string) => apiFetch<Player>(`/players/search?username=${name}`)
export const getClanInfo = (id: string) => apiFetch<ClanInfo>(`/clans/${id}/info`)
export const getRoles = () => apiFetch<{ roles: Role[] }>(`/roles`)
export const currentCuest = (id: string) => apiFetch<QuestData>(`/clans/${id}/quests/active`)
export const announcements = (id: string) => apiFetch<Announcement[]>(`/clans/${id}/announcements`)
export const questsAvailable = (id: string) =>
	apiFetch<AvailableQuest[]>(`/clans/${id}/quests/available`)
