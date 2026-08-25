<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import SectionBlock from '@/components/common/SectionBlock.vue'
import { CLAN_ID, currentCuest, announcements, questsAvailable } from '@/services/api'

import imgEnAttente from '@/assets/images/enattente.jpg'
import Gold from '@/assets/images/Gold.vue'
import Gem from '@/assets/images/Gem.vue'

interface Participant {
	playerId: string
	username: string
	xp: number
}

interface QuestData {
	quest: {
		promoImageUrl: string
		purchasableWithGems: boolean
	}
	tierEndTime: string
	participants: Participant[]
}

interface Announcement {
	id: string
	content: string
	timestamp: string
}

interface AvailableQuest {
	id: string
	promoImageUrl: string
	purchasableWithGems: boolean
}

const activeQuest = ref<QuestData | null>(null)
const nextQuestAnnouncements = ref<Announcement[]>([])
const allAvailableQuests = ref<AvailableQuest[]>([])
const isLoading = ref<boolean>(true)


onMounted(async () => {
	try {
		isLoading.value = true
		const questRes = await currentCuest(CLAN_ID).catch(e => {
			if (!(e instanceof Error && e.message.includes('404'))) {
				console.error('currentQuest KO', e)
			}
			else {
				console.log("Pas de quête active")
			}
			return null
		})
		const annoncesRes = await announcements(CLAN_ID).catch(e => {
			if (!(e instanceof Error && e.message.includes('404'))) {
				console.error('announcements KO', e)
			}
			else {
				console.log("Pas d'annonces")
			}
			return null
		})
		const availableRes = await questsAvailable(CLAN_ID).catch(e => { console.error('questsAvailable KO', e); return null })

		activeQuest.value = questRes
		nextQuestAnnouncements.value = annoncesRes
		allAvailableQuests.value = availableRes
	} catch (error) {
		console.error("Erreur lors de la récupération des données:", error)
	} finally {
		isLoading.value = false
	}
})

const nextQuestAnnouncement = computed(() => {
	return nextQuestAnnouncements.value.find(a => a.content.toLowerCase().includes('prochaine quête'))
})

const nextQuestDetails = computed(() => {
	if (!nextQuestAnnouncement.value) return null

	if (allAvailableQuests.value.length === 0) {
		console.warn("Attention: allAvailableQuests est vide. L'API a-t-elle renvoyé les quêtes ?")
		return null
	}

	const content = nextQuestAnnouncement.value.content
	console.log("Annonce de quête détectée :", content)

	const matchIndex = content.match(/quête n°(\d+)/i)
	const questIndex = matchIndex && matchIndex[1] ? parseInt(matchIndex[1]) - 1 : 0

	const quest = allAvailableQuests.value[questIndex]
	if (!quest) {
		console.error(`La quête numéro ${questIndex + 1} est introuvable dans la liste API !`)
		return null
	}

	const matchTime = content.match(/prochaine quête\s*(.*?)(?:📢|:loudspeaker:|🏆|\n|$)/iu)
	const timeText = matchTime && matchTime[1] ? matchTime[1].trim() : 'bientôt'

	return {
		quest,
		timeText,
		rawContent: content
	}
})
</script>

<template>
	<SectionBlock title="Bienvenue sur le site du clan Werewolf Online !">
		<p>
			Vous pouvez avoir accès aux règles, aux quêtes, aux évènements du clan mais aussi aux différents items
			cachés du jeu et un questionnaire permettant de gagner 10 roses.
			Les quêtes gratuites ne sont pas forcément à jour sur ce site, pour être sûr d'avoir les vrais nombres,
			suivez les annonces dans le clan.
		</p>
	</SectionBlock>

	<SectionBlock title="Chargement..." v-if="isLoading" class="loading">
		<p>Chargement des données du clan...</p>
	</SectionBlock>

	<div v-else>
		<SectionBlock title="Prochaine quête" class="center">
			<div v-if="nextQuestDetails && nextQuestDetails.quest">
				<img class="skin" :src="nextQuestDetails.quest.promoImageUrl" alt="Prochaine quête" />
				<p>
					La prochaine quête sera une quête
					<span v-if="nextQuestDetails.quest.purchasableWithGems">
						<Gem />
					</span>
					<span v-else>
						<Gold />
					</span>
					<br />
					La quête commencera <strong>{{ nextQuestDetails.timeText }}</strong>.
				</p>
			</div>
			<div v-else>
				<img class="skin" :src="imgEnAttente" alt="En attente de la prochaine quête" />
				<br /><br />
			</div>
		</SectionBlock>

		<SectionBlock title="Quête actuelle" class="center">
			<div v-if="activeQuest && activeQuest.quest">
				<img class="skin" :src="activeQuest.quest.promoImageUrl" alt="Quête actuelle" />

				<p>Participants :</p>
				<ul>
					<li v-for="participant in activeQuest.participants" :key="participant.playerId">
						{{ participant.username }} : {{ participant.xp }}xp
					</li>
				</ul>
			</div>
			<div v-else>
				<img class="skin" :src="imgEnAttente" alt="Aucune quête en cours" />
				<br /><br />
			</div>
		</SectionBlock>
	</div>
</template>
