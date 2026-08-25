import type { RoleCard, Role, DisplayRole } from '@/types/player'

export function mapRoleCards(cards: RoleCard[], allRoles: Role[]): DisplayRole[] {
	return cards.map((card) => {
		const role = allRoles.find((r) => r.id === card.roleId1)

		return {
			roleId1: card.roleId1,
			name: role?.name ?? card.roleId1,
			img: role?.image.url ?? '',
			rarity: card.rarity.toLowerCase(),
		}
	})
}

const RARITY_COLORS: Record<string, string> = {
	COMMON: 'gray',
	RARE: 'cyan',
	EPIC: 'blueviolet',
	LEGENDARY: 'yellow',
	MYTHICAL: 'red',
}

export function getColor(rarity: string): string {
	return RARITY_COLORS[rarity.toUpperCase()] ?? 'white'
}
