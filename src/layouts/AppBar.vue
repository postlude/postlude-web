<template>
	<v-app-bar flat>
		<v-app-bar-nav-icon variant="text" @click.stop="isOpenSideBar = !isOpenSideBar" />
		<v-toolbar-title>POSTLUDE</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-btn variant="text" icon="mdi-magnify"></v-btn>
	</v-app-bar>

	<v-navigation-drawer v-model="isOpenSideBar">
		<v-list-item link to="/dev-link">
			<v-icon>mdi-link</v-icon>
			개발 링크
		</v-list-item>
	</v-navigation-drawer>
</template>

<!-- <script lang="ts" setup>
let drawer = false;
const items = [
	{
		title: 'Foo',
		value: 'foo',
	},
	{
		title: 'Bar',
		value: 'bar',
	},
	{
		title: 'Fizz',
		value: 'fizz',
	},
	{
		title: 'Buzz',
		value: 'buzz',
	},
];
</script> -->

<script>
export default {
	data: () => ({
		isOpenSideBar: true,
		items: [
			{
				title: 'Foo',
				value: 'foo'
			},
			{
				title: 'Bar',
				value: 'bar'
			},
			{
				title: 'Fizz',
				value: 'fizz'
			},
			{
				title: 'Buzz',
				value: 'buzz'
			}
		]
	})
};
</script>