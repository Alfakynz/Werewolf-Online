const API_URL: string = 'https://api.wolvesville.com'
const API_KEY: string = import.meta.env.VITE_API_KEY
export const CLAN_ID: string = '28f85d51-37b1-4fc6-a938-47656353363c'
const CLAN_NAME: string = 'WerewoIf OnIine*'

const HEADERS = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
	Authorization: `Bot ${API_KEY}`,
}

export async function getClanInfo(id: string) {
	const response = await fetch(`${API_URL}/clans/${id}/info`, {
		headers: HEADERS,
	})

	if (!response.ok) {
		throw new Error(`API error: ${response.status}`)
	}

	return response.json()
}

export async function getRoles() {
	const response = await fetch(`${API_URL}/roles`, {
		headers: HEADERS,
	})

	if (!response.ok) {
		throw new Error(`API error: ${response.status}`)
	}

	return response.json()
}

export async function searchUser(name: string) {
	const response = await fetch(`${API_URL}/players/search?username=${name}`, {
		headers: HEADERS,
	})

	if (!response.ok) {
		throw new Error(`API error: ${response.status}`)
	}

	return response.json()
}

export async function currentCuest(id: string) {
	const response = await fetch(`${API_URL}/clans/${id}/quests/active`, {
		headers: HEADERS,
	})

	if (!response.ok) {
		throw new Error(`API error: ${response.status}`)
	}

	return response.json()
}

export async function announcements(id: string) {
	const response = await fetch(`${API_URL}/clans/${id}/announcements`, {
		headers: HEADERS,
	})

	if (!response.ok) {
		throw new Error(`API error: ${response.status}`)
	}

	return response.json()
}

export async function questsAvailable(id: string) {
	const response = await fetch(`${API_URL}/clans/${id}/quests/available`, {
		headers: HEADERS,
	})

	if (!response.ok) {
		throw new Error(`API error: ${response.status}`)
	}

	return response.json()
}
