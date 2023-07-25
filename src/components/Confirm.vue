<template>
	<v-snackbar v-model="isOpenSnackbar" :timeout="-1" :color="color" @update:modelValue="$emit('close')">
		<v-icon>mdi-alert-circle-outline</v-icon> {{ text }}&nbsp;
		<v-btn size="small" color="grey-lighten-3" @click="$emit('confirm')">confirm</v-btn>&nbsp;
		<v-btn size="small" color="grey-lighten-1" @click="$emit('close')">cancel</v-btn>
	</v-snackbar>
</template>

<script>
export default {
	name: 'Confirm',
	props: {
		isOpen: {
			type: Boolean,
			default: () => false
		},
		text: {
			type: String
		},
		color: {
			type: String,
			default: () => 'red-darken-2'
		}
	},
	watch: {
		isOpen: function () {
			this.isOpenSnackbar = this.isOpen;
		}
	},
	data() {
		return {
			isOpenSnackbar: false
		};
	}
};
</script>
