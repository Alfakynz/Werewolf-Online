<script setup lang="ts">
defineProps<{
	to: string
}>()
</script>

<template>
	<li>
		<router-link :to="to" class="nav-item">
			<slot />
		</router-link>
	</li>
</template>
