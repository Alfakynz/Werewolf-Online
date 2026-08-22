import { createRouter, createWebHistory } from 'vue-router'

import AccueilView from '@/views/AccueilView.vue'
import ReglesView from '@/views/ReglesView.vue'
import QuetesView from '@/views/QuetesView.vue'
import RecompensesView from '@/views/RecompensesView.vue'
import EventsView from '@/views/EventsView.vue'
import ItemsView from '@/views/ItemsView.vue'
import QuestionnaireView from '@/views/QuestionnaireView.vue'
import SearchView from '@/views/SearchView.vue'
import InfosView from '@/views/InfosView.vue'
import AnnonceView from '@/views/AnnonceView.vue'
import NoteView from '@/views/NoteView.vue'
import AdminView from '@/views/AdminView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),

	routes: [
		{
			path: '/',
			name: 'accueil',
			component: AccueilView,
			meta: {
				title: 'Bienvenue dans le clan',
			},
		},
		{
			path: '/regles',
			name: 'regles',
			component: ReglesView,
			meta: {
				title: 'Règles du clan',
			},
		},
		{
			path: '/quetes',
			name: 'quetes',
			component: QuetesView,
			meta: {
				title: 'Quêtes du clan',
			},
		},
		{
			path: '/recompenses',
			name: 'recompenses',
			component: RecompensesView,
			meta: {
				title: 'Récompenses du clan',
			},
		},
		{
			path: '/events',
			name: 'events',
			component: EventsView,
			meta: {
				title: 'Évènements du clan',
			},
		},
		{
			path: '/items',
			name: 'items',
			component: ItemsView,
			meta: {
				title: 'Items spéciaux',
			},
		},
		{
			path: '/questionnaire',
			name: 'questionnaire',
			component: QuestionnaireView,
			meta: {
				title: 'Questionnaire bonus',
			},
		},
		{
			path: '/infos',
			name: 'infos',
			component: InfosView,
			meta: {
				title: 'Informations du clan',
			},
		},
		{
			path: '/search',
			name: 'search',
			component: SearchView,
			meta: {
				title: 'Chercher un joueur',
			},
		},
		{
			path: '/annonce',
			name: 'annonce',
			component: AnnonceView,
			meta: {
				title: 'Annonces du clan',
			},
		},
		{
			path: '/note',
			name: 'note',
			component: NoteView,
			meta: {
				title: 'Note du questionnaire',
			},
		},
		{
			path: '/admin',
			name: 'admin',
			component: AdminView,
			meta: {
				title: 'Administration du clan',
			},
		},
	],
})

export default router
