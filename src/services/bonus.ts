import supabase from '@/services/supabaseClient'

export interface PlayerModifier {
	username: string
	amount: number
}

export interface ClanModifiers {
	bonus: PlayerModifier[]
	malus: PlayerModifier[]
}

export async function getClanModifiers(clanId: string): Promise<ClanModifiers> {
	try {
		const { data: players, error } = await supabase
			.from('players')
			.select('username, quest_modifier')
			.eq('clan_id', clanId)
			.eq('in_clan', true)
			.neq('quest_modifier', 0)

		if (error) throw error

		const sortAlphabetically = (a: any, b: any) => a.username.localeCompare(b.username)

		const bonus = players
			.filter((p) => p.quest_modifier < 0)
			.sort(sortAlphabetically)
			.map((p) => ({
				username: p.username,
				amount: Math.abs(p.quest_modifier),
			}))

		const malus = players
			.filter((p) => p.quest_modifier > 0)
			.sort(sortAlphabetically)
			.map((p) => ({
				username: p.username,
				amount: p.quest_modifier,
			}))

		return { bonus, malus }
	} catch (err) {
		console.error('Erreur lors de la récupération des bonus/malus:', err)
		throw err
	}
}
