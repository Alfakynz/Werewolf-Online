<script setup lang="ts">
import type { Component } from 'vue';

defineProps<{
	title: string,
	id?: string,
	img?: Component
}>()
</script>

<template>
	<section :id="id">
		<h2>
			{{ title }}
			<component v-if="img" :is="img" />
		</h2>
		<slot />
	</section>
</template>
