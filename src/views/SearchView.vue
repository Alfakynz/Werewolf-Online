<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SectionBlock from '@/components/common/SectionBlock.vue'
import { getClanInfo, getRoles, searchUser } from '@/services/api'
import { mapRoleCards, getColor } from '@/utils/player'
import type { Player, ClanInfo, DisplayRole } from '@/types/player'

const route = useRoute()
const router = useRouter()

const username = ref('')
const player = ref<Player | null>(null)
const clan = ref<ClanInfo | null>(null)
const roles = ref<DisplayRole[]>([])

const loading = ref(false)
const error = ref<string | null>(null)

function updateQuery(name: string) {
	router.push({ query: { u: name } })
}

async function handleSearch(name = username.value.trim()) {
	if (!name) return

	loading.value = true
	error.value = null
	player.value = null
	clan.value = null
	roles.value = []

	try {
		player.value = await searchUser(name)

		if (player.value.clanId) {
			clan.value = await getClanInfo(player.value.clanId)
		}

		const rolesRes = await getRoles()
		roles.value = mapRoleCards(player.value.roleCards, rolesRes.roles)
	} catch (err) {
		console.error(err)
		error.value = 'Impossible de trouver ce joueur.'
	} finally {
		loading.value = false
	}
}

function formatDate(date: string): string {
	const formatted = new Intl.DateTimeFormat('fr-FR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	}).format(new Date(date))

	return formatted.replace(' ', ' à ')
}

onMounted(() => {
	const u = route.query.u
	if (typeof u === 'string' && u.trim()) {
		username.value = u
		handleSearch(u.trim())
	}
})
</script>

<template>
	<SectionBlock title="Entrez le pseudo de quelqu'un" class="center">
		<form class="searchForm" @submit.prevent="() => { updateQuery(username.trim()); handleSearch() }">
			<input v-model="username" name="username" type="search" placeholder="Chercher un joueur" />

			<button type="submit" :disabled="loading" class="search-btn">
				{{ loading ? 'Recherche...' : 'Chercher' }}
			</button>
		</form>

		<p v-if="error">
			{{ error }}
		</p>
	</SectionBlock>

	<SectionBlock v-if="player" :title="`${player.username} - Niveau ${player.level}`" class="center">
		<p>
			<b>Bio :</b>
			<br />

			<span v-for="line in (player.personalMessage ?? '').split('\n')" :key="line">
				{{ line }}<br />
			</span>
		</p>
		<br />
		<p>
			<b>Dernière connexion :</b>
			{{ formatDate(player.lastOnline) }}

			<br />

			<b>Création du compte :</b>
			{{ formatDate(player.creationTime) }}

			<br />

			<b>Roses reçues :</b>
			{{ player.receivedRosesCount }}

			<br />

			<b>Roses envoyées :</b>
			{{ player.sentRosesCount }}

			<br />

			<b>Status :</b>
			{{ player.status.toLowerCase() }}

			<br />

			<b>Clan :</b>
			{{ clan?.name ?? 'Aucun clan' }}
		</p>

		<img :src="player.equippedAvatar.url.replace('.png', '@2x.png')" class="profile-img" />

		<details>
			<summary class="summary">Cartes :</summary>

			<table class="roles_table">
				<thead>
					<tr>
						<th>Rôle</th>
						<th>Rareté</th>
					</tr>
				</thead>

				<tbody>
					<tr v-for="card in roles" :key="card.roleId1">
						<td>
							<div class="role">
								<img :src="card.img" :alt="card.name + 'icon'" class="img-role">
								{{ card.name }}
							</div>
						</td>

						<td :style="{ color: getColor(card.rarity) }">
							{{ card.rarity.charAt(0).toUpperCase() + card.rarity.slice(1) }}
						</td>
					</tr>
				</tbody>
			</table>
		</details>
	</SectionBlock>
</template>
