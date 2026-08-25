export interface Participant {
	playerId: string
	username: string
	xp: number
}

export interface QuestData {
	quest: {
		promoImageUrl: string
		purchasableWithGems: boolean
	}
	tierEndTime: string
	participants: Participant[]
}

export interface Announcement {
	id: string
	content: string
	timestamp: string
}

export interface AvailableQuest {
	id: string
	promoImageUrl: string
	purchasableWithGems: boolean
}

export interface ParsedNextQuest {
	quest: AvailableQuest
	timeText: string
}
