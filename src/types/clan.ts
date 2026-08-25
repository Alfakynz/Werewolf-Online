export interface PlayerModifier {
	username: string
	amount: number
}

export interface ClanModifiers {
	bonus: PlayerModifier[]
	malus: PlayerModifier[]
}
