<template>
	<v-app>
		<v-layout>
			<app-bar />
			<v-main>
				<router-view />
			</v-main>
		</v-layout>
	</v-app>
</template>

<script setup>
import AppBar from '@/components/AppBar.vue';
</script>
