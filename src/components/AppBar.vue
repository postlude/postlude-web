<template>
	<v-app-bar flat>
		<v-app-bar-nav-icon variant="text" @click.stop="isOpenSideBar = !isOpenSideBar" />
		<v-toolbar-title style="cursor: pointer" @click="moveProfile">POSTLUDE</v-toolbar-title>
		<v-btn v-show="isSignIn" icon="mdi-account-circle" @click="signOut" />
		<v-btn v-show="!isSignIn" icon="mdi-account-circle-outline" @click="openSignIn" />
	</v-app-bar>

	<v-navigation-drawer v-model="isOpenSideBar">
		<v-list>
			<v-list-item link to="/dev-link" class="justify-center">
				<v-icon>mdi-link</v-icon>
				개발 링크
			</v-list-item>
		</v-list>
	</v-navigation-drawer>

	<v-dialog v-model="isOpenSignIn" :close-delay="0" :open-delay="0">
		<sign-in @close="isOpenSignIn = false"/>
	</v-dialog>
</template>

<script>
import SignIn from './SignIn.vue';

export default {
	components: {
		SignIn
	},
	data: () => ({
		isOpenSideBar: true,
		isOpenSignIn: false
	}),
	computed: {
		isSignIn() {
			return this.$store.getters.isSignIn;
		}
	},
	methods: {
		moveProfile() {
			this.$router.push('/');
		},
		openSignIn() {
			this.isOpenSignIn = true;
		},
		signOut() {
			this.$store.commit('removeAccessToken');
		}
	}
};
</script>