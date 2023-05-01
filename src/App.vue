<template>
	<v-app>
		<v-layout>
			<app-bar />
			<v-main>
				<v-container class="d-flex justify-center align-center">
					<router-view />
				</v-container>
			</v-main>
		</v-layout>
	</v-app>
</template>

<script setup>
import AppBar from './layouts/AppBar.vue';
</script>
