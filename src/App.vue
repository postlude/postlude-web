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
import Cookie from 'js-cookie';
import { useStore } from 'vuex';

const isSignIn = !!Cookie.get('access-token');
const store = useStore();
store.commit('setSignIn', isSignIn);
</script>
