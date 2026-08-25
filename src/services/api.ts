import type { QuestData, Announcement, AvailableQuest, Player, ClanInfo, Role } from '@/types/index'

const API_URL: string = import.meta.env.VITE_API_URL

export const CLAN_ID: string = '28f85d51-37b1-4fc6-a938-47656353363c'
export const CLAN_NAME: string = 'WerewoIf OnIine*'

async function apiFetch<T>(path: string): Promise<T> {
	const response = await fetch(`${API_URL}${path}`)
	if (!response.ok) {
		const error = new Error(`API error: ${response.status}`) as Error & { status?: number }
		error.status = response.status
		throw error
	}
	return response.json()
}

export const searchUser = (name: string) =>
	apiFetch<Player>(`/api/wolvesville/players/search?username=${encodeURIComponent(name)}`)
export const getClanInfo = (id: string) => apiFetch<ClanInfo>(`/api/wolvesville/clans/${id}/info`)
export const getRoles = () => apiFetch<{ roles: Role[] }>(`/api/wolvesville/roles`)
export const currentCuest = (id: string) =>
	apiFetch<QuestData>(`/api/wolvesville/clans/${id}/quests/active`)
export const announcements = (id: string) =>
	apiFetch<Announcement[]>(`/api/wolvesville/clans/${id}/announcements`)
export const questsAvailable = (id: string) =>
	apiFetch<AvailableQuest[]>(`/api/wolvesville/clans/${id}/quests/available`)
