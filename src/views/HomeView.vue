<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import SectionBlock from '@/components/common/SectionBlock.vue'
import { CLAN_ID, currentCuest, announcements, questsAvailable } from '@/services/api'
import { fetchSafe } from '@/utils/apiSafe'
import { parseNextQuest } from '@/utils/quest'
import type { Announcement, AvailableQuest, Participant, QuestData } from '@/types/index'

import imgEnAttente from '@/assets/images/enattente.jpg'
import Gold from '@/assets/images/Gold.vue'
import Gem from '@/assets/images/Gem.vue'

const activeQuest = ref<QuestData | null>(null)
const nextQuestAnnouncements = ref<Announcement[]>([])
const allAvailableQuests = ref<AvailableQuest[]>([])
const isLoading = ref<boolean>(true)

onMounted(async () => {
	isLoading.value = true
	const [questRes, annoncesRes, availableRes] = await Promise.all([
		fetchSafe(currentCuest(CLAN_ID), 'currentQuest', [404]),
		fetchSafe(announcements(CLAN_ID), 'announcements', [404]),
		fetchSafe(questsAvailable(CLAN_ID), 'questsAvailable'),
	])

	activeQuest.value = questRes
	nextQuestAnnouncements.value = annoncesRes ?? []
	allAvailableQuests.value = availableRes ?? []
	isLoading.value = false
})

const nextQuestAnnouncement = computed(() => {
	return nextQuestAnnouncements.value.find(a => a.content.toLowerCase().includes('prochaine quête'))
})

const nextQuestDetails = computed(() => {
	if (!nextQuestAnnouncement.value) return null

	const result = parseNextQuest(nextQuestAnnouncement.value.content, allAvailableQuests.value)
	if (!result) {
		console.error('Quête introuvable dans la liste API')
		return null
	}

	return { ...result, rawContent: nextQuestAnnouncement.value.content }
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
				<img class="skin" :src="nextQuestDetails.quest.promoImageUrl.replace('.jpg', '@2x.jpg')"
					alt="Prochaine quête" />
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
				<img class="skin" :src="activeQuest.quest.promoImageUrl.replace('.jpg', '@2x.jpg')"
					alt="Quête actuelle" />

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
