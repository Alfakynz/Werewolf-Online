import { createRouter, createWebHistory } from 'vue-router'

import * as Views from '@/views/index'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),

	routes: [
		{
			path: '/',
			name: 'home',
			component: Views.HomeView,
			meta: {
				title: 'Accueil',
				nav_title: 'Accueil',
			},
		},
		{
			path: '/rules',
			name: 'rules',
			component: Views.RulesView,
			meta: {
				title: 'Règles du clan',
				nav_title: 'Règles',
			},
		},
		{
			path: '/quests',
			name: 'quests',
			component: Views.QuestsView,
			meta: {
				title: 'Quêtes du clan',
				nav_title: 'Quêtes',
			},
		},
		{
			path: '/items',
			name: 'items',
			component: Views.ItemsView,
			meta: {
				title: 'Items cachés',
				nav_title: 'Items cachés',
			},
		},
		{
			path: '/search',
			name: 'search',
			component: Views.SearchView,
			meta: {
				title: "Recherche d'un joueur",
				nav_title: 'Recherche',
			},
		},
		{
			path: '/about',
			name: 'about',
			component: Views.AboutView,
			meta: {
				title: 'À propos',
				nav_title: 'À propos',
			},
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'not-found',
			component: Views.NotFoundView,
			meta: {
				title: 'Page introuvable',
				nav_title: '',
			},
		},
	],
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		}
		if (to.hash) {
			return {
				el: to.hash,
				behavior: 'smooth',
			}
		}
		return { top: 0, behavior: 'smooth' }
	},
})

export default router
