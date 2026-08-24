<script setup lang="ts">
import { ref } from 'vue'
import NavItem from '@/components/common/NavItem.vue'

const isOpen = ref(false)

function toggleMenu() {
	isOpen.value = !isOpen.value
}

function closeMenu() {
	isOpen.value = false
}
</script>

<template>
	<nav class="nav" :class="{ 'is-open': isOpen }">
		<div class="nav-header">
			<button class="burger" :class="{ 'is-open': isOpen }" @click="toggleMenu" aria-label="Menu">
				<span></span>
				<span></span>
				<span></span>
			</button>
		</div>

		<div class="nav-collapse" :class="{ 'is-open': isOpen }">
			<ul>
				<NavItem to="/" @click="closeMenu">Accueil</NavItem>
				<NavItem to="/rules" @click="closeMenu">Règles</NavItem>
				<NavItem to="/quests" @click="closeMenu">Quêtes</NavItem>
				<NavItem to="/items" @click="closeMenu">Items</NavItem>
				<NavItem to="/search" @click="closeMenu">Recherche</NavItem>
				<NavItem to="/about" @click="closeMenu">À propos</NavItem>
			</ul>
		</div>
	</nav>
</template>
