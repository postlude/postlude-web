<template>
	<v-card location="top center" max-width="344">
		<v-card-title>Sign In</v-card-title>

		<v-text-field v-model="email" type="email" label="Email" :error-messages="emailErrorMessage" />
		<v-text-field v-model="password" type="password" label="password" :counter="30" :error-messages="passwordErrorMessage" @keypress.enter="signIn" />
		<v-btn :loading="loading" color="default" type="submit" block text="Submit" @click="signIn" />
	</v-card>
</template>


<script>
import { signIn } from '@/util/api';

export default {
	name: 'SignIn',
	data() {
		return {
			loading: false,
			email: '',
			password: ''
		};
	},
	computed: {
		emailErrorMessage() {
			if (!this.email) {
				return '';
			}
			if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(this.email)) {
				return '';
			}
			return 'Must be a valid e-mail.';
		},
		passwordErrorMessage() {
			if (!this.password) {
				return '';
			}
			if (this.password.length > 30) {
				return 'Max 30 characters';
			}
			return '';
		}
	},
	methods: {
		async signIn() {
			try {
				if (!this.email
					|| !this.password
					|| this.emailErrorMessage
					|| this.passwordErrorMessage
				) {
					return;
				}

				const { data } = await signIn({
					email: this.email,
					password: this.password
				});

				this.$store.commit('setAccessToken', data);

				this.$emit('close');
			} catch (error) {
				console.error(error);
				alert('Sign In Fail');
			}
		}
	}
};
</script>
