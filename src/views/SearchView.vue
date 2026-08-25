<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SectionBlock from '@/components/common/SectionBlock.vue'
import { getClanInfo, getRoles, searchUser } from '@/services/api'

const route = useRoute()
const router = useRouter()

const username = ref('')
const player = ref<any | null>(null)
const clan = ref<any | null>(null)
const roles = ref<any[]>([])

const loading = ref(false)
const error = ref<string | null>(null)

async function handleSearch(fromUrl = false) {
	if (!username.value.trim()) {
		return
	}

	// Met à jour l'URL sauf si la recherche vient déjà de l'URL (évite une boucle)
	if (!fromUrl) {
		router.push({ query: { u: username.value.trim() } })
	}

	loading.value = true
	error.value = null
	player.value = null
	clan.value = null
	roles.value = []

	try {
		player.value = await searchUser(username.value.trim())

		if (player.value.clanId) {
			clan.value = await getClanInfo(player.value.clanId)
		}

		const response = await getRoles()

		roles.value = player.value.roleCards.map((card: any) => {
			const role = response.roles.find((role: any) => role.id === card.roleId1)

			return {
				roleId1: card.roleId1,
				name: role?.name ?? card.roleId1,
				img: role.image.url,
				rarity: card.rarity.toLowerCase(),
			}
		})
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

function getColor(rarity: string): string {
	switch (rarity.toUpperCase()) {
		case 'COMMON':
			return 'gray'
		case 'RARE':
			return 'cyan'
		case 'EPIC':
			return 'blueviolet'
		case 'LEGENDARY':
			return 'yellow'
		case 'MYTHICAL':
			return 'red'
		default:
			return 'white'
	}
}

onMounted(() => {
	const u = route.query.u
	if (typeof u === 'string' && u.trim()) {
		username.value = u
		handleSearch(true)
	}
})
</script>

<template>
	<SectionBlock title="Entrez le pseudo de quelqu'un" class="center">
		<form class="searchForm" @submit.prevent="handleSearch()">
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

			<span v-for="line in player.personalMessage.split('\n')" :key="line">
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
