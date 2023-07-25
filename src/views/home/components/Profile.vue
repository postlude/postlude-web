<template>
	<!-- <v-card class="mx-auto my-12" max-width="344"> -->
	<v-card class="w-100" max-width="344">
		<v-img src="@/assets/supersonic.jpg" />

		<v-card-title>POSTLUDE</v-card-title>

		<v-card-text>
			<div>
				<v-icon>mdi-github</v-icon>
				<span style="cursor: pointer" @click="moveGithub">
					github.com/postlude
				</span>
			</div>
			<div>
				<v-icon>mdi-post</v-icon>
				<span style="cursor: pointer" @click="moveBlog">
					postlude.github.io
				</span>
			</div>
			<div>
				<v-icon>mdi-email-outline</v-icon> seungdeokhan@naver.com
			</div>
		</v-card-text>
	</v-card>
</template>

<script setup>
const moveBlog = () => window.open('http://postlude.github.io', '_black');
const moveGithub = () => window.open('https://github.com/postlude', '_black');
</script>
