<template>
	<v-snackbar v-model="isOpenSnackbar" :timeout="1500" :color="color" @update:modelValue="$emit('close')">
		{{ text }}
	</v-snackbar>
</template>

<script>
export default {
	name: 'Message',
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
			default: () => 'blue-lighten-1'
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
