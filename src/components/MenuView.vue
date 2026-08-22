<script setup lang="ts">
import { onMounted, watch } from 'vue'

const props = defineProps({
	currentPage: {
		type: String,
		required: true,
	},
})

function removeFadeInClasses() {
	document.querySelectorAll('.fade-in').forEach((el) => {
		el.classList.remove('fade-in')
	})
}

function redirect(location: string) {
	removeFadeInClasses()
	setTimeout(() => {
		window.location.href = location
	}, 250)
}

function redirection() {
	const menu = document.getElementById('menu') as HTMLSelectElement
	switch (menu.value) {
		case 'accueil':
			redirect('/')
			break
		case 'regles':
			redirect('/regles')
			break
		case 'quetes':
			redirect('/quetes')
			break
		case 'recompenses':
			redirect('/recompenses')
			break
		case 'events':
			redirect('/events')
			break
		case 'items':
			redirect('/items')
			break
		case 'questionnaire':
			redirect('/questionnaire')
			break
		case 'infos':
			redirect('/informations')
			break
		case 'copy-annonce':
			redirect('/annonce')
			break
		case 'search':
			redirect('/search')
			break
	}
}

function syncSelectedOption() {
	const menu = document.getElementById('menu') as HTMLSelectElement
	if (menu) menu.value = props.currentPage
}

onMounted(syncSelectedOption)
watch(() => props.currentPage, syncSelectedOption)
</script>

<template>
	<section title="Changer de page">
		<select id="menu" @change="redirection">
			<option value="accueil">Accueil</option>
			<option value="regles">Règles</option>
			<option value="quetes">Quêtes</option>
			<option value="recompenses">Récompenses</option>
			<option value="events">Évènements</option>
			<option value="items">Items spéciaux</option>
			<option value="questionnaire">Questionnaire</option>
			<option value="search">Chercher quelqu'un</option>
			<option value="infos">Informations</option>
			<option value="copy-annonce">Copier l'annonce de la quête</option>
			<option v-if="currentPage === 'note'" value="note">Note</option>
			<option v-if="currentPage === 'admin'" value="admin">Administrateur</option>
		</select>
	</section>
</template>
