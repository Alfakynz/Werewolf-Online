<script setup lang="ts">
import { useRoute, RouterView } from 'vue-router'

import FooterView from './components/FooterView.vue'
import HeaderView from './components/HeaderView.vue'
import MenuView from './components/MenuView.vue'
import ReturnButton from './components/ReturnButton.vue'

const route = useRoute()
</script>

<template>
	<HeaderView :title="route.meta.title" />
	<MenuView :currentPage="route.name" />
	<ReturnButton />
	<main>
		<RouterView />
	</main>
	<FooterView />
</template>
