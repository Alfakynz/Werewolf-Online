<script setup lang="ts">
import { watch } from 'vue'
import { useRoute, RouterView } from 'vue-router'

import HeaderView from '@/components/layout/HeaderView.vue'
import NavView from '@/components/layout/NavView.vue'
import DiscordButton from '@/components/layout/DiscordButton.vue'
const route = useRoute()

watch(
	() => route.meta.nav_title,
	(title) => {
		document.title = (title as string) ?? 'Werewolf Online'
	},
	{ immediate: true }
)
</script>

<template>
	<NavView />
	<HeaderView :title="route.meta.title" />
	<DiscordButton />
	<main>
		<RouterView />
	</main>
</template>
