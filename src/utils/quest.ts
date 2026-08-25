import type { AvailableQuest, ParsedNextQuest } from '@/types/quest'

export function parseNextQuest(
	content: string,
	availableQuests: AvailableQuest[],
): ParsedNextQuest | null {
	const matchIndex = content.match(/quête n°(\d+)/i)
	const questIndex = matchIndex?.[1] ? parseInt(matchIndex[1]) - 1 : 0

	const quest = availableQuests[questIndex]
	if (!quest) return null

	const matchTime = content.match(/prochaine quête\s*(.*?)(?:📢|:loudspeaker:|🏆|\n|$)/iu)
	const timeText = matchTime?.[1]?.trim() || 'bientôt'

	return { quest, timeText }
}
